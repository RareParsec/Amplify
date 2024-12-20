import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../config/FirebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearLoading, setError, setLoading } from "../../redux/slices/authSlice";
import GoBackButton from "../../components/Header-Navigation/GoBackButton";

const VerifyEmail = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const handlePress = async () => {
    dispatch(setLoading());
    if (!auth.currentUser) {
      return;
    }

    await auth.currentUser.reload();
    if (auth.currentUser.emailVerified) {
      console.log("Email verified");
      navigation.navigate("SelectUsername");
      dispatch(clearLoading());
    } else {
      console.log("Email not verified");
      return dispatch(setError([{ errorType: "verifyEmail", message: `Email not verified` }]));
    }
  };

  useEffect(() => {
    dispatch(clearLoading());
    dispatch(clearError());
        if (!auth.currentUser) return; //handle error

    sendEmailVerification(auth.currentUser)
      .then(() => console.log("Verification email sent"))
      .catch((err) => {
        return console.log(err);
      });
  }, []);

  return (
    <View className="bg-black flex-1 items-center">
      <Text className="text-white mt-40 text-3xl font-bold">Verify Email</Text>
      <Text className="text-white mt-10 text-[14px] text-center w-[70%]">
        A verification email has been sent to your email address. Please view the email and follow the instructions to
        verify your account.
      </Text>
      <View className="mt-10 mb-2 w-[80%] items-center">
        {error &&
          error.map((error, index) => {
            if (error?.errorType === "verifyEmail") {
              return (
                <Text
                  className="text-[11px] mx-1 text-red-600 tracking-[2px] font-semibold whitespace-normal"
                  key={index}
                >
                  {error.message}
                </Text>
              );
            }
            return null;
          })}
      </View>
      <View className="rounded-md border-zinc-300 border">
        <Pressable onPress={handlePress} className="px-4 py-3" disabled={loading}>
          <Text className="text-white font-bold">{loading ? `Loading` : "I've verified my email."}</Text>
        </Pressable>
      </View>
      <GoBackButton navigation={navigation} />
    </View>
  );
};

export default VerifyEmail;
