import React, {useCallback} from 'react';
import {Card} from '../../realm/schema';
import {Title} from './title';
import {StyleSheet, View} from 'react-native';
import {AudioController} from '../../common/component/audio_controller';
import {useRealm} from '../../realm';
import {AudioFile} from '../../common/files/audio_file';
import {ImageController} from '../../common/component/image_controller';
import {ImageFile} from '../../common/files/image_file';

type Props = {
  card: Card;
};

export const QuestionView = (props: Props) => {
  const {realm} = useRealm();
  const {question, audio, image} = props.card;

  const onChangeAudio = useCallback(
    async (file?: AudioFile) => {
      if (file) {
        await file.saveToRealm(realm!);
      } else {
        realm!.write(() => {
          realm?.create<Card>('Card', {
            ...props.card,
            audio: undefined,
          });
        });
      }
    },
    [props.card],
  );

  const onChangeImage = useCallback(
    async (file?: ImageFile) => {
      if (file) {
        await file.saveToRealm(realm!);
      } else {
        realm!.write(() => {
          realm?.create<Card>('Card', {
            ...props.card,
            image: undefined,
          });
        });
      }
    },
    [props.card],
  );

  return (
    <View style={s.root}>
      <View style={s.titleLine}>
        <View style={s.title}>
          <Title text={question} />
        </View>
        {audio && (
          <AudioController
            onChange={onChangeAudio}
            file={AudioFile.fromRealmAudio(audio)}
          />
        )}
      </View>
      {image && (
        <ImageController
          onChange={onChangeImage}
          file={ImageFile.fromRealmImage(image)}
        />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    flexDirection: 'column',
    marginLeft: 16,
    marginRight: 16,
  },
  titleLine: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    flex: 1,
  },
});
