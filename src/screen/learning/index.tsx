import React, {useEffect, useState} from 'react';
import {DrawerScreenProps} from "@react-navigation/drawer";
import {ResultsScreen} from "./results";
import {AnswerScreen} from "./answer";
import {QuestionScreen} from "./question";
import {AnswerResult, Card, LearnSession} from "../../realm/schema";
import {useRealm} from "../../realm";
import shortid from "shortid";

type Props = {
  cards: Card[]
  learnSession: LearnSession;
  onFinish: () => void
}

const LearningInitializedScreen = (props: Props) => {
  const {cards, onFinish, learnSession} = props;
  const {realm} = useRealm()
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard: Card = cards[currentCardIndex]

  const onNext = () => {
    if(!showAnswer) {
      setShowAnswer(true)
    } else {
      setShowAnswer(false)
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const onAnswer = (answerResult: AnswerResult) => {
    realm?.write(() => {
      const ar: AnswerResult = realm?.create('AnswerResult', answerResult)

      currentCard.knowledgeLevel = getNewKnowledgeLevel(currentCard, answerResult)
      currentCard.answerResults.push(ar)
      currentCard.lastAnswerDate = learnSession.beginDate
      learnSession.answerResults.push(ar)

      onNext()
    })
  }

  if (currentCardIndex >= cards.length) {
    return <ResultsScreen learnSessionId={learnSession.id} onFinish={onFinish}/>
  }

  if (showAnswer) {
    return <AnswerScreen
      card={currentCard}
      learnSession={learnSession}
      onAnswer={onAnswer}
    />
  }

  return <QuestionScreen card={currentCard} onNext={onNext} />
}


export const LearningScreen = (props: DrawerScreenProps<{cardIDs: string[]}>) => {
  const cardIDs = props.route.params
  const {realm} = useRealm()
  const [cards, setCards] = useState<Card[]>([]);
  const [learnSession, setLearnSession] = useState<LearnSession>(null as any);
  const [loading, setLoading] = useState(true);

  const onFinish = () => {
    props.navigation.goBack()
  }

  useEffect(() => {
    if (cards.length === 0) {
      const cards: Card[] = [];

      cardIDs.forEach((id) => {
        const card = realm?.objectForPrimaryKey<Card>('Card', id);

        if(card) {
          cards.push(card)
        }
      })

      realm?.write(() => {
        const ls: LearnSession = realm?.create('LearnSession', {
          id: shortid(),
          answerResults: [],
          beginDate: new Date(),
          toLearnCards: cards
        })

        setLearnSession(ls)
        setCards(cards)
        setLoading(false)
      })
    }
  }, [cardIDs, realm])

  if(loading) {
    return null;
  }

  return <LearningInitializedScreen cards={cards} onFinish={onFinish} learnSession={learnSession} />
};

const getNewKnowledgeLevel = (card: Card, answerResult: AnswerResult) => {
  if (answerResult.code === 0) {
    return Math.max( 0.1, card.knowledgeLevel / 2)
  }

  const multiplier = card.knowledgeLevel < 6 ? 1 / 3 : 0.5
  const increase = multiplier * answerResult.code

  return Math.min(10, card.knowledgeLevel + increase)
}
