import {ObjectSchema} from 'realm';

export class ImagePart {
  constructor(private realm: Realm) {}
}

export const IMAGE_SCHEMA: ObjectSchema = {
  name: 'Image',
  properties: {
    id: 'string',
    width: 'int',
    height: 'int',
    filename: 'string',
  },
  primaryKey: 'id',
};
