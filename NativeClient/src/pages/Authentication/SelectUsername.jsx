import { View, Text, Pressable, TextInput } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios.config.js";
import { clearError, clearLoading, setError, setLoading, signUpDatabase } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import React from "react";
import { auth } from "../../config/FirebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

const SelectUsername = ({ navigation }) => {
  const { error, loading } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    dispatch(setLoading());
    try {
      if (username.length < 3)
        return dispatch(setError([{ errorType: "username", message: "Username must be atleast 3 characters" }]));
      if (username.length > 20)
        return dispatch(setError([{ errorType: "username", message: "Username must be at most 20 characters" }]));

      const response = await axios.get(`/api/auth/username_in_use/${username}`);
      if (response.data.result) {
        return dispatch(setError([{ errorType: "username", message: "Username already in use" }]));
      }
      await dispatch(signUpDatabase({ firebase_id: auth.currentUser.uid, username }))
        .unwrap()
        .then(() => {
          auth.currentUser.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      return dispatch(setError([{ errorType: "general", message: "Internal server error. Please try again later." }]));
    }
  };

  useEffect(() => {
    dispatch(clearLoading());
    dispatch(clearError());

    if (!auth.currentUser) {
      navigation.navigate("SignUp");
    } else if (!auth.currentUser.emailVerified) {
      navigation.navigate("VerifyEmail");
    }
  }, []);

  return (
    <View className="flex-1 items-center bg-black">
      <Pressable
        className="absolute left-4 top-16 flex-row items-center"
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        disabled={loading}
      >
        <MaterialCommunityIcons name="chevron-left" size={30} color={"rgb(255,40,0)"} />
        <Text className="" style={{ color: "rgb(255,40,0)" }}>
          Go Back
        </Text>
      </Pressable>

      <View className={`items-center pb-7 w-[85%] mt-48`}>
        {/** Title */}
        <Text className="text-[45px] font-bold mb-8 text-center" style={{ color: "rgb(	255, 40, 0)" }}>
          Select Username
        </Text>

        {/** Username */}
        <View className="flex-row mb-1 w-full justify-center">
          <View className="flex-col items-center ">
            <TextInput
              className="border-b border-zinc-800 rounded-md w-52 px-2 text-[17px] py-2 text-zinc-300 text-center"
              keyboardAppearance="dark"
              name="username"
              value={username}
              onChangeText={setUsername}
            />
            <Text className="text-[11px] mx-1 text-white tracking-[2px] font-semibold w-fit mt-1">Username</Text>
            <View className="min-h-[28] mt-1">
              {error &&
                error.map((error, index) => {
                  if (error?.errorType === "username") {
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
            <Text className="text-[10px] mx-1 text-zinc-300 tracking-[1px] font-semibold w-[250px] text-center">
              You will NOT be able to change your username after account creation
            </Text>
          </View>
        </View>
        <Pressable
          className="px-10 py-2 rounded-md mt-4 border border-zinc-800"
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="text-center font-bold text-white text-[20px]">{loading ? "Loading" : "Sign Up"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SelectUsername;
