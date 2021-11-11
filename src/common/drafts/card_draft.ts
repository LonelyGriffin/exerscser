import {AudioFile} from '../files/audio_file';
import {ImageFile} from '../files/image_file';
import {Draft} from './draft';
import {Tag} from '../../entity/tag';
import {Deck} from '../../entity/deck';
import {AnswerResult} from '../../entity/answer_result';
import {Card} from '../../entity/card';
import {genUUID} from '../uuid';

type Props = {
  type: 'simple';
  tags: Tag[];
  decks: Deck[];
  answerResults: AnswerResult[];
  question: string;
  answer: string;
  created: Date;
  knowledgeLevel: number;
  lastAnswerDate?: Date;
  image?: ImageFile;
  audio?: AudioFile;
  id?: string;
};

export class CardDraft implements Draft<Card> {
  constructor(readonly props: Props) {}

  toClean(): Card {
    return {
      ...this.props,
      id: this.props.id || genUUID(),
      image: this.props.image ? this.props.image.toRealmImage() : undefined,
      audio: this.props.audio ? this.props.audio.toRealmAudio() : undefined,
    };
  }

  async saveToRealm(realm: Realm) {
    this.props.image && (await this.props.image.saveToRealm(realm));
    this.props.audio && (await this.props.audio.saveToRealm(realm));

    realm!.write(() => {
      realm!.create('Card', this.toClean());
    });
  }
}
