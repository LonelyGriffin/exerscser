import React from 'react'
import {View, Text} from "react-native";
import {useRealm, useRealmObject} from "../../realm";
import {BSON} from "realm";
import {LearnSession} from "../../realm/schema";

type Props = {
  learnSessionId: string
  onFinish: () => void
}

export const ResultsScreen = (props: Props) => {
  const learnSession = useRealmObject('LearnSession', props.learnSessionId)

  return <View>
    <Text>{JSON.stringify(learnSession?.answerResults.length, null, '\t')}</Text>
    <Text>{JSON.stringify(learnSession?.toLearnCards.length, null, '\t')}</Text>
    <Text>{JSON.stringify(learnSession?.id, null, '\t')}</Text>
    <Text>{JSON.stringify(learnSession?.beginDate, null, '\t')}</Text>
  </View>
}
