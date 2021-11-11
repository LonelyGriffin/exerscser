import React from 'react'
import {useRealm} from "../realm";
import {useState} from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView} from "react-native";
import {AnswerResult, Card, Deck, LearnSession, Tag} from "../realm/schema";

export const RealmDebug = () => {
  const {realm} = useRealm()
  const decks: Deck[] = realm?.objects('Deck') as any || []

  return (
    <ScrollView>
    <Arr prefix={'deck: '} data={decks} Component={DeckE} s={0} />
    </ScrollView>
  )
}

const getInd = (s: number) => {
  let r = ''
  for(let i = 0; i < s; i++) {
    r += '  '
  }

  return r
}

const Arr = (props: {prefix: string, data: any[], Component: any, s: number}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <View style={arrS.root}>
      <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
      <View>
      <Text>
        <Text>{props.prefix}</Text>
        {!expanded && <Text>+</Text>}
        {expanded && <Text>-</Text>}
        <Text>{` [${props.data.length}]`}</Text>
      </Text>
      </View>
      </TouchableWithoutFeedback>
      {expanded && (<View>
        {props.data.map((item, i) => (
          <View>
            <Text>{`${getInd(props.s)}------------`}</Text>
          <props.Component key={i} item={item} s={props.s + 1} />
          </View>
          ))}
      </View>)}
    </View>
  )
}

const arrS = StyleSheet.create({
  root: {
    flexDirection: 'column'
  }
})

const TagE = (props: {item: Tag, s: number}) => {
  const ind = getInd(props.s)
  return (
    <View>
      <Text>{`${ind}Card: ${props.item.name}`}</Text>
      <Arr prefix={`${ind}cards: `} data={props.item.cards} Component={CardE} s={props.s} />
    </View>
  )
}

const CardE = (props: {item: Card, s: number}) => {
  const ind = getInd(props.s)
  return (
    <View>
      <Text>{`${ind}Card: ${props.item.id}`}</Text>
      <Text>{`${ind}question: ${props.item.question}`}</Text>
      <Text>{`${ind}answer: ${props.item.answer}`}</Text>
      <Text>{`${ind}created: ${props.item.created}`}</Text>
      <Text>{`${ind}type: ${props.item.type}`}</Text>
      <Arr prefix={`${ind}tags: `} data={props.item.tags} Component={TagE} s={props.s} />
      <Arr prefix={`${ind}decks: `} data={props.item.decks} Component={DeckE} s={props.s} />
      <Arr prefix={`${ind}answerResults: `} data={props.item.answerResults} Component={AnsResE} s={props.s} />
    </View>
  )
}

const DeckE = (props: {item: Deck, s: number}) => {
  const ind = getInd(props.s)
  return (
    <View>
      <Text>{`${ind}Deck: ${props.item.name}`}</Text>
      <Arr prefix={`${ind}cards: `} data={props.item.cards} Component={CardE} s={props.s} />
    </View>
  )
}

const AnsResE = (props: {item: AnswerResult, s: number}) => {
  const ind = getInd(props.s)
  return (
    <View>
      <Text>{`${ind}AnsRes: ${props.item.id}`}</Text>
      <Text>{`${ind}order: ${props.item.order}`}</Text>
      <Text>{`${ind}code: ${props.item.code}`}</Text>
      <Text>{`${ind}timestamp: ${props.item.timestamp}`}</Text>
      <Arr prefix={`${ind}card: `} data={[props.item.card]} Component={CardE} s={props.s} />
      <Arr prefix={`${ind}learnSes: `} data={[props.item.learnSession]} Component={LearnSesE} s={props.s} />
    </View>
  )
}

const LearnSesE = (props: {item: LearnSession, s: number}) => {
  const ind = getInd(props.s)
  return (
    <View>
      <Text>{`${ind}LearnSes: ${props.item.id}`}</Text>
      <Text>{`${ind}beginDate: ${props.item.beginDate}`}</Text>
      <Arr prefix={`${ind}toLearnCards: `} data={props.item.toLearnCards} Component={CardE} s={props.s} />
      <Arr prefix={`${ind}AnsResE: `} data={props.item.answerResults} Component={AnsResE} s={props.s} />
    </View>
  )
}
