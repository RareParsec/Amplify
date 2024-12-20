import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const InputPassword = ({ props, style }) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  return (
    <View className="flex-row flex-1 items-center">
      <TextInput
        className={style}
        keyboardAppearance="dark"
        secureTextEntry={!showPassword}
        textContentType="password"
        {...props}
      />
      <Pressable onPress={() => setShowPassword(!showPassword)} className="absolute right-0">
        <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} color={"white"} size={25} />
      </Pressable>
    </View>
  );
};

export default InputPassword;
