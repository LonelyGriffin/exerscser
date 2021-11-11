import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, Keyboard, View} from 'react-native';
import {UIAutocompleteInput} from './input';
import {usePortals} from '../../common/component/portals/hook';
import {OpenPortalMethodResultType} from '../../common/component/portals/context';
import {UIAutocompletePortal, UIAutocompletePortalProps} from './portal';
import {Measurement, Props} from './types';

export function UIAutocomplete<Tag>(
  props: Props<Tag>,
) {
  const {tags, renderTag, tagIdExtractor, text, onChangeText} = props;
  const {openPortal} = usePortals();
  const windowHeight = useWindowHeight();

  const [measurement, setMeasurement] = useState<Measurement>({x: 0, y: 0, w: 0, h: 0});
  const containerRef = useRef<View>(null);
  const portalRef = useRef<OpenPortalMethodResultType<null, UIAutocompletePortalProps<Tag>>>(null);
  const placeholder = tags.length > 0 ? '' : props.placeholder

  const onLayout = () => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.measureInWindow((x, y, w, h) => {
      setMeasurement({x, y, w, h});
    });
  };
  const closeAutocompletePortal = () => {
    if (!portalRef.current) {
      return;
    }

    portalRef.current.close();
    // @ts-ignore
    portalRef.current = null;
  };
  const openAutocompletePortal = useCallback(() => {
    if (portalRef.current || !containerRef.current) {
      return;
    }
    containerRef.current.measureInWindow((x, y, w, h) => {
      setMeasurement( {x, y, w, h});
      // @ts-ignore
      portalRef.current = openPortal(UIAutocompletePortal, {
        measurement: {x, y, w, h},
        windowHeight,
        onClose: closeAutocompletePortal,
        autocompleteProps: props,
      });
    });
  }, [windowHeight, openPortal, props, closeAutocompletePortal]);

  const rerenderAutocompletePortal = (p: UIAutocompletePortalProps<Tag>) => {
    if (!portalRef.current) {
      return;
    }

    portalRef.current.rerender(p);
  };

  useEffect(() => {
    rerenderAutocompletePortal({
      measurement,
      autocompleteProps: props,
      windowHeight,
      onClose: closeAutocompletePortal,
    });
  }, [measurement, props, windowHeight]);

  useEffect(() => {
    return () => {
      if (portalRef.current) {
        portalRef.current.close();
      }
    }
  }, [])

  return (
    <UIAutocompleteInput
      containerRef={containerRef}
      tags={tags}
      renderTag={renderTag}
      tagIdExtractor={tagIdExtractor}
      onFocus={openAutocompletePortal}
      text={text}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onLayout={onLayout}
    />
  );
}

const useWindowHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e: any) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return Dimensions.get('window').height - keyboardHeight;
};
