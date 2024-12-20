import { View, Text, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { continueWithGoogle, setLoading } from "../../../redux/slices/authSlice";

const ContinueWithGoogle = ({ navigation, disabled }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleContinueWithGoogle = async () => {
    dispatch(setLoading());
    try {
      await dispatch(continueWithGoogle()).unwrap();
    } catch (error) {
        console.log(error)
      if (error === "Username not found") {
        navigation.navigate("SelectUsername");
      }
    }
  };
  return (
    <View className="items-center">
      <Pressable
        className="py-3 rounded-md border-zinc-800 border"
        onPress={handleContinueWithGoogle}
        disabled={disabled}
      >
        <Text className="text-center font-bold text-white text-[20px] mx-12">
          {loading ? "Loading" : "Continue with Google"}
        </Text>
      </Pressable>
    </View>
  );
};

export default ContinueWithGoogle;
