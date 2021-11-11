import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ViewStyle,
} from 'react-native';

type Option<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  value: T;
  options: Option<T>[];
  style?: any;
  extractKey?: (value: T) => string;
  onChange?: (value: T, options: Option<T>[]) => void;
};

export function UIMultiSwitcher<T = unknown>(props: Props<T>) {
  const [value, setValue] = useState<T>(props.value);

  const onPress = (value: T) => {
    setValue(value);
    props.onChange && props.onChange(value, props.options);
  };

  useEffect(() => {
    setValue(value);
  }, [props.value]);

  const extractKey = props.extractKey || ((value: T) => String(value));

  return (
    <View style={{...s.root, ...props.style}}>
      {props.options.map(option => (
        <TouchableHighlight
          underlayColor={'#ffffff'}
          style={option.value === value ? s.activeButton : s.button}
          key={extractKey(option.value)}
          onPress={() => onPress(option.value)}>
          <Text style={option.value === value ? s.activeText : s.text}>
            {option.label}
          </Text>
        </TouchableHighlight>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    backgroundColor: '#DADFE5',
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    height: 32,
    padding: 2,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    borderRadius: 8,
    backgroundColor: '#DADFE5',
  },
  activeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#82A5D9',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  activeText: {
    fontFamily: 'Poppins-Bold',
    color: '#00245A',
  },
});
