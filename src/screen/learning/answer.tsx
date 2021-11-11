import React from 'react'
import {View, Text, Button} from "react-native";
import {AnswerResult, Card, LearnSession} from "../../realm/schema";
import shortid from "shortid";

type Props = {
  learnSession: LearnSession;
  card: Card
  onAnswer: (answerResult: AnswerResult) => void
}

export const AnswerScreen = (props: Props) => {
  const {card, learnSession, onAnswer} = props;

  const onResult = (code: number) => {
    const answerResult: AnswerResult = {
      card,
      code,
      learnSession,
      id: shortid(),
      order: Math.max(-1, ...card.answerResults.map(x => x.order)) + 1,
      timestamp: new Date()
    }

    onAnswer(answerResult)
  }

  return <View>
    <Text>{card.question}</Text>
    <Text>{' - '}</Text>
    <Text>{card.answer}</Text>
    <Button title={'Fail'} onPress={() => onResult(0)} />
    <Button title={'Bad'} onPress={() => onResult(1)} />
    <Button title={'Good'} onPress={() => onResult(2)} />
    <Button title={'Easy'} onPress={() => onResult(3)} />
  </View>
}
