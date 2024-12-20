import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const InputText = ({props, style}) => {

  return (
    <View className="flex-row flex-1 items-center">
      <TextInput className={style} keyboardAppearance="dark" {...props} textContentType='emailAddress' />
    </View>
  );
}

export default InputText