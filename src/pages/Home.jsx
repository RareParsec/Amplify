import React, { useEffect, useRef, useState } from "react";
import { Button, FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import Feed from "../components/Feed-Post_Template/Feed";
import { apiKey } from "@env";


export default function Home({ navigation }) {
useEffect(() => {
  console.log(apiKey)
},[])
  return (
    <SafeAreaView className="flex-1 bg-black" edges={["right", "left"]}>
      {/* <Button title="hedheh" onPress={()=>navigation.navigate('Temp')}></Button> */}
      <View className="flex-1">
        <Feed/>
      </View>
    </SafeAreaView>
  );
}
