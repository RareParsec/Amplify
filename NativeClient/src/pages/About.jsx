import React, { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About({navigation}) {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Text>About</Text>
      {/* <Button title="Go to Temptwo" onPress={() => navigation.navigate('Temptwo')}></Button> */}
    </SafeAreaView>
  );
}
