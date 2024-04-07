import { View, Text } from "react-native";
import React from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const GoBackButton = ({ navigation }) => {
  return (
    <>
      {navigation.canGoBack() ? (
        <SafeAreaView className="absolute ml-4 h-fit pointer-events-none z-10">
         <View className="rounded-full bg-black p-3">
              <IconAntDesign
                name="arrowleft"
                color={"#fff"}
                size={25}
                onPress={() => navigation.goBack()}
              ></IconAntDesign>
         </View>
        </SafeAreaView>
      ) : (
        ""
      )}
    </>
  );
};

export default GoBackButton;
