import React from 'react';
import { Text, Pressable } from 'react-native';
import { Base, Typography } from '../styles';

export default function ButtonCustom(props) {
  const { onPress, title, send } = props;

  return (
    <Pressable style={send ? Base.buttonSend : Base.button} onPress={onPress}>
      <Text style={Typography.buttonText}>{title}</Text>
    </Pressable>
  );
}

// from https://docs.expo.dev/ui-programming/react-native-styling-buttons/