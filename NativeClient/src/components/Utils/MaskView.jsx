import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MaskView = ({ children }) => {
  return (
    <MaskedView
      maskElement={<LinearGradient className="flex-grow" colors={["white", "white", "transparent"]} />}
    >
      {children}
    </MaskedView>
  );
};

export default MaskView;
