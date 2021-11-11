import React, {ComponentProps} from 'react';
import {UIModal, UIModalChildrenProps} from '../common/component/ui_modal';
import {TagsAutocomplete} from '../common/component/tags_autocomplete';
import {useState} from 'react';
import {View} from 'react-native';
import {useCallback} from 'react';
import {FULL_MODAL_MIN_TOP_OFFSET} from './constants';
import {UiModalHeader} from '../ui_kit/ui_modal_header';
import {UITextInput} from '../ui_kit/ui_text_input';
import {DecksAutocomplete} from '../common/component/decks_autocomplete';
import {StyleSheet} from 'react-native';
import {UITransparentButton} from '../ui_kit/ui_transparent_button';
import {AudioController} from '../common/component/audio_controller';
import {ImageController} from '../common/component/image_controller';
import {genUUID} from '../common/uuid';
import {Tag} from '../entity/tag';
import {Deck} from '../entity/deck';
import {Card} from '../entity/card';
import {Image} from '../entity/image';
import {Audio} from '../entity/audio';

type OuterProps = {
  topOffset?: number;
};

export const NewCardModalBody = (props: UIModalChildrenProps<Card>) => {
  const {close} = props;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [imageFile, setImageFile] = useState<Image | undefined>();
  const [audioFile, setAudioFile] = useState<Audio | undefined>();

  const saveButtonDisabled = question === '' || answer === '';

  const onSave = useCallback(() => {
    const newCard: Card = {
      answer,
      question,
      tags,
      decks,
      type: 'simple',
      created: new Date(),
      id: genUUID(),
      answerResults: [],
      knowledgeLevel: 0,
      image: imageFile,
      audio: audioFile,
    };

    close(newCard);
  }, [question, answer, tags, close, decks, imageFile, audioFile]);

  return (
    <>
      <UiModalHeader
        title={'Create card'}
        right={<UITransparentButton text="Save" onPress={onSave} disabled={saveButtonDisabled} />}
      />
      {/*<ImageController onChange={setImageFile} file={imageFile} initialSearchQuery={question} />*/}
      {/*<AudioController onChange={setAudioFile} file={audioFile} />*/}
      <UITextInput placeholder={'Question'} value={question} onChangeText={setQuestion} style={s.input} />
      <UITextInput placeholder={'Answer'} value={answer} onChangeText={setAnswer} style={s.input} />
      <View style={s.input}>
        <TagsAutocomplete tags={tags} onChange={setTags} />
      </View>
      <View style={s.input}>
        <DecksAutocomplete decks={decks} onChange={setDecks} />
      </View>
    </>
  );
};

export const NewCardModal = (props: OuterProps) => {
  const topOffset = props.topOffset === undefined ? FULL_MODAL_MIN_TOP_OFFSET : props.topOffset;
  return <UIModal topOffset={topOffset}>{modalProps => <NewCardModalBody {...modalProps} />}</UIModal>;
};

const s = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
});
