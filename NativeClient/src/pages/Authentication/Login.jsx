import { View, Text, TextInput, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios.config.js";

import React, { useEffect, useState } from "react";
import { clearError, clearLoading, logIn, setError, setLoading, signUp } from "../../redux/slices/authSlice";
import CredentialFields from "./components/CredentialFields";
import { auth } from "../../config/FirebaseConfig.js";
import ContinueWithGoogle from "./components/ContinueWithGoogle.jsx";
import ContinueAnonymously from "./components/ContinueAnonymously.jsx";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.auth);

  const handleChange = (name, value) => {
    name === "email" && setEmail(value);
    name === "password" && setPassword(value);
    name === "username" && setUsername(value);

    dispatch(clearError());
  };

  const handleSubmit = async () => {
    dispatch(setLoading());
    try {
      const response = await axios.post("/api/auth/email_in_use", { email });
      if (!response.data.result) {
        return dispatch(setError([{ errorType: "email", message: "No account found for this email" }]));
      }

      const loggedInUser = await dispatch(logIn({ email, password })).unwrap();
      console.log("User Logged In");

      if (loggedInUser.emailVerified === false) {
        dispatch(clearLoading());
        return navigation.navigate("VerifyEmail");
      }
      if (loggedInUser.username === null) {
        dispatch(clearLoading());
        return navigation.navigate("SelectUsername");
      }
    } catch (error) {
      if (error === "auth/invalid-credential" || error === "auth/missing-password") {
        return dispatch(setError([{ errorType: "password", message: "Invalid password" }]));
      } else if (error === "Username not found") {
        navigation.navigate("SelectUsername", { email, password });
      } else {
        return dispatch(
          setError([{ errorType: "general", message: "Internal server error. Please try again later." }])
        );
      }
    }
  };

  useEffect(() => {
    dispatch(clearLoading());
    dispatch(clearError());
  }, []);

  // useEffect(() => {
  //   const functio = async () => {
  //     try {
  //         await dispatch(signUp({ email:'tracking@gmail.com', password:'trakng', username:'tracs' })).unwrap();

  //     } catch (error) {
  //       console.log(error)
  //       console.log('errorororor')
  //     }
  //   };
  //   functio();
  // }, []);

  return (
    <View className="flex-1 items-center bg-black">
      <View className="items-center pb-7 w-[85%] mt-48">
        {/** Title */}
        <Text className="text-[45px] font-bold mb-8" style={{ color: "rgb(	255, 40, 0)" }}>
          Log In
        </Text>
        {/** Email&Password */}
        <CredentialFields handleChange={handleChange} emailValue={email} passwordValue={password} />
        {/** Submit */}
        <Pressable
          className="px-10 py-2 rounded-md mt-4 border border-zinc-800"
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-center font-bold text-white text-[20px]">{loading ? "Loading" : "Login"}</Text>
        </Pressable>
      </View>
      {/** Or */}
      <View className="justify-center mt-4 mb-12 items-center">
        <View className="w-80 border-b border-zinc-900"></View>
        <Text className="absolute text-white bg-black px-4">Or</Text>
      </View>
      {/** Google */}
      <ContinueWithGoogle navigation={navigation} />
      {/** Sign up */}
      <View className="flex-row items-center mt-5">
        <Text className="text-[15px] text-zinc-400">Already have an account? </Text>
        <Pressable
          className="py-2"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          disabled={loading}
        >
          <Text className="text-[15px] font-bold" style={{ color: "rgb(255, 40, 0)" }}>
            Sign Up
          </Text>
        </Pressable>
      </View>
      <ContinueAnonymously />
    </View>
  );
};

export default Login;
