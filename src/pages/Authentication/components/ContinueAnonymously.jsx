import { View, Text, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../config/FirebaseConfig";
import { continueAnonymously, setLoading } from "../../../redux/slices/authSlice.js";

const ContinueAnonymously = ({ disabled = false }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleContinueAnonymously = async () => {
    try {
      await dispatch(continueAnonymously()).unwrap();
      console.log(auth.currentUser.uid, auth.currentUser.isAnonymous);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-row items-center">
      <Pressable className="pb-2" onPress={handleContinueAnonymously} disabled={disabled}>
        <Text className="text-[15px] text-zinc-500 font-bold">Continue as guest.</Text>
      </Pressable>
    </View>
  );
};

export default ContinueAnonymously;
