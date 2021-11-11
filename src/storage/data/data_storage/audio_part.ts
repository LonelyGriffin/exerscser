import {ObjectSchema} from 'realm';

export class AudioPart {
  constructor(private realm: Realm) {}
}

export const AUDIO_SCHEMA: ObjectSchema = {
  name: 'Audio',
  properties: {
    id: 'string',
    duration: 'float',
    filename: 'string',
  },
  primaryKey: 'id',
};
