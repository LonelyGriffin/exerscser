import {noop, omit} from 'lodash-es';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import {Card} from '../../realm/schema';
import {UIList, UIListProps} from '../../ui_kit/ui_list';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {UICheckIcon} from "../../ui_kit/icons/check";
import {UICheckbox} from "../../ui_kit/ui_checkbox";
import {UIProgressCircle} from "../../ui_kit/ui_progress_circle";

export type CardListViewState = 'all' | 'question' | 'answer';

type Props = Omit<UIListProps<Card>, 'idExtractor' | 'renderItem'> & {
  viewState?: CardListViewState;
};

export const CardList = (props: Props) => {
  const viewState = props.viewState || 'all';
  const listProps = omit(props, 'viewState');
  return (
    <UIList
      {...listProps}
      idExtractor={card => card.id}
      renderItem={({item}, isSelected) => (
        <>
          {(viewState === 'all' || viewState === 'question') && (
            <View style={s.question}>
              <Text style={s.questionText}>{item.question}</Text>
            </View>
          )}
          {(viewState === 'all' || viewState === 'answer') && (
            <View style={s.answer}>
              <Text style={s.answerText}>{item.answer}</Text>
            </View>
          )}
          <View style={s.right}>
            {listProps.isSelectionMode ? (
              <UICheckbox value={isSelected} />
            ) : (
              <UIProgressCircle card={item} />
            )}
          </View>
        </>
      )}
    />
  );
};

const s = StyleSheet.create({
  question: {
    flex: 1,
  },
  questionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#00245A',
  },
  answerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#00515A',
  },
  answer: {
    flex: 1,
  },
  right: {
    marginRight: 16
  },
});
