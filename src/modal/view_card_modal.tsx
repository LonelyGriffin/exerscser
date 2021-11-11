import React from 'react';
import {UIModal, UIModalChildrenProps} from '../common/component/ui_modal';
import {TagsAutocomplete} from '../common/component/tags_autocomplete';
import {useState} from 'react';
import {Card, Deck, Tag} from '../realm/schema';
import {View} from 'react-native';
import {useCallback} from 'react';
import {FULL_MODAL_MIN_TOP_OFFSET} from './constants';
import {UiModalHeader} from '../ui_kit/ui_modal_header';
import {UITextInput} from '../ui_kit/ui_text_input';
import {DecksAutocomplete} from '../common/component/decks_autocomplete';
import {StyleSheet} from 'react-native';
import {UITransparentButton} from '../ui_kit/ui_transparent_button';
import {useRealm, useRealmObject} from "../realm";
import {AudioFile} from "../common/files/audio_file";
import {AudioController} from "../common/component/audio_controller";
import {ImageController} from "../common/component/image_controller";
import {ImageFile} from "../common/files/image_file";

type OuterProps = {
  topOffset?: number;
  cardId: string;
};

export const ViewCardModalBody = (props: UIModalChildrenProps & {cardId: string}) => {
  const {realm} = useRealm()
  const card: Card = useRealmObject('Card', props.cardId)
  const {close} = props;
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);
  const [tags, setTags] = useState<Tag[]>(card.tags);
  const [decks, setDecks] = useState<Deck[]>(card.decks);
  const [audioFile, setAudioFile] = useState<AudioFile | undefined>(card.audio ? AudioFile.fromRealmAudio(card.audio) : undefined)
  const [imageFile, setImageFile] = useState<ImageFile | undefined>(card.image ? ImageFile.fromRealmImage(card.image) : undefined)

  const saveButtonDisabled = question === '' || answer === '';

  const onSave = useCallback(async () => {
    if (audioFile?.isTemp()) {
      await audioFile?.saveToRealm(realm!)
    }

    realm?.write(() => {
      card.answer = answer;
      card.question = question;
      card.tags = tags;
      card.decks = decks;
      card.audio = audioFile?.toRealmAudio()
    })

    close(undefined);
  }, [question, answer, tags, close, decks]);

  return (
    <>
      <UiModalHeader
        title={'View card'}
        right={
          <UITransparentButton
            text="Ok"
            onPress={onSave}
            disabled={saveButtonDisabled}
          />
        }
      />
      <UITextInput
        placeholder={'Question'}
        value={question}
        onChangeText={setQuestion}
        style={s.input}
      />
      <UITextInput
        placeholder={'Answer'}
        value={answer}
        onChangeText={setAnswer}
        style={s.input}
      />
      <ImageController onChange={setImageFile} file={imageFile} initialSearchQuery={question} />
      <AudioController onChange={setAudioFile} file={audioFile} />
      <View style={s.input}>
        <TagsAutocomplete tags={tags} onChange={setTags} />
      </View>
      <View style={s.input}>
        <DecksAutocomplete decks={decks} onChange={setDecks} />
      </View>
    </>
  );
};

export const ViewCardModal = (props: OuterProps) => {
  const topOffset =
    props.topOffset === undefined ? FULL_MODAL_MIN_TOP_OFFSET : props.topOffset;
  return (
    <UIModal topOffset={topOffset}>
      {modalProps => <ViewCardModalBody {...modalProps} cardId={props.cardId} />}
    </UIModal>
  );
};

const s = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
});
