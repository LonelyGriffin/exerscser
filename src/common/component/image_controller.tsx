import React, {ComponentProps, useEffect, useState} from 'react';
import {ImageFile} from '../files/image_file';
import {Text, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {ChooseImageModal} from '../../modal/choose_image_modal';
import {usePortals} from './portals/hook';

type Props = {
  initialSearchQuery?: string;
  file?: ImageFile;
  onChange: (image?: ImageFile) => void;
  modalTopOffset?: number;
};

export const ImageController = (props: Props) => {
  const {openPortal} = usePortals();
  const {file, onChange} = props;

  const onPress = async () => {
    const image = await openPortal<
      ImageFile | undefined,
      ComponentProps<typeof ChooseImageModal>
    >(ChooseImageModal, {
      initialQuery: props.initialSearchQuery || '',
    }).result;

    onChange(image);
  };

  return (
    <TouchableHighlight onPress={onPress}>
      {file ? (
        <Image source={{uri: file.getUri()}} style={s.image} />
      ) : (
        <Text>Choose image</Text>
      )}
    </TouchableHighlight>
  );
};

const s = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    margin: 5,
    aspectRatio: 1,
  },
});
