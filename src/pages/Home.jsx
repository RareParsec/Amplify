import React, { useEffect, useRef, useState } from "react";
import { Button, FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feed from "../components/Feed-Post_Template/Feed";
import {auth} from '../config/FirebaseConfig.js'
import { useDispatch } from "react-redux";
import { signOut } from "../redux/slices/authSlice.js";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
useEffect(() => {
  // console.log(auth)
},[])
  return (
    <SafeAreaView className="flex-1 bg-black" edges={["right", "left"]}>
      <Pressable className="bg-white p-2 w-24" onPress={()=>{dispatch(signOut())}} >
        <Text className="text-black text-center">Signout</Text>
      </Pressable>
      {/* <Button title="hedheh" onPress={()=>navigation.navigate('Temp')}></Button> */}
      <View className="flex-1">
        <Feed />
      </View>
    </SafeAreaView>
  );
}
