import {Card} from "../../realm/schema";
import {AudioFile} from "../files/audio_file";
import {ImageFile} from "../files/image_file";

export type DeckDraft = Omit<Deck, 'audio' | 'image'> & {
  audio: AudioFile,
  image: ImageFile
}
