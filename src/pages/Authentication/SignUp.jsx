import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import zxcvbn from "zxcvbn";
import { clearError, clearLoading, setError, setLoading, signUpFirebase } from "../../redux/slices/authSlice";
import CredentialFields from "./components/CredentialFields";
import axios from "../../config/axios.config.js";
import ContinueWithGoogle from "./components/ContinueWithGoogle.jsx";
import ContinueAnonymously from "./components/ContinueAnonymously.jsx";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (name, value) => {
    name === "email" && setEmail(value);
    name === "password" && setPassword(value);
    name === "username" && setUsername(value);

    dispatch(clearError());
  };

  const handleContinue = async () => {
    dispatch(setLoading());
    const errors = [];

    const validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!validEmail.test(String(email).toLowerCase())) {
      errors.push({ errorType: "email", message: "Invalid email" });
    }

    try {
      const response = await axios.post(`/api/auth/email_in_use`, { email });
      if (response.data.result) {
        errors.length = 0;
        errors.push({ errorType: "email", message: "Email already in use" });
        return dispatch(setError(errors));
      }
    } catch (err) {
      console.log(err);
      errors.push({ errorType: "general", message: "Internal server error. Please try again later." });
      return dispatch(setError(errors));
    }

    if (zxcvbn(password).score < 1) {
      errors.push({ errorType: "password", message: "Password is too weak" });
    }

    if (password.length < 6) {
      errors.push({ errorType: "password", message: "Please enter atleast 6 digits" });
    }

    if (errors.length > 0) {
      dispatch(setError(errors));
      return;
    }

    dispatch(signUpFirebase({ email, password }))
      .unwrap()
      .then(() => {
        navigation.navigate("VerifyEmail");
      })
      .catch((err) => {
        console.log(err);
        dispatch(setError([{ errorType: "general", message: "An error has occured. Please try again later." }]));
      });
  };

  useEffect(() => {
    dispatch(clearLoading());
    dispatch(clearError());
  }, []);

  return (
    <View className="flex-1 items-center bg-black">
      <View className={`items-center pb-7 w-[85%] mt-48`}>
        {/** Title */}
        <Text className="text-[45px] font-bold mb-8 text-center" style={{ color: "rgb(	255, 40, 0)" }}>
          Sign Up
        </Text>

        {/** Continue */}

        <>
          {/** Email&Password */}
          <CredentialFields handleChange={handleChange} emailValue={email} passwordValue={password} />
          {/** Submit */}
          <Pressable
            className="px-10 py-2 rounded-md mt-4 border border-zinc-800"
            onPress={handleContinue}
            disabled={loading}
          >
            <Text className="text-center font-bold text-white text-[20px]"> {loading ? "Loading" : "Continue"}</Text>
          </Pressable>
        </>
      </View>

      <>
        {/** Or */}
        <View className="justify-center mt-4 mb-12 items-center">
          <View className="w-80 border-b border-zinc-900"></View>
          <Text className="absolute text-white bg-black px-4">Or</Text>
        </View>
        {/** Google */}
        <ContinueWithGoogle navigation={navigation} />
      </>

      {/** Log in */}
      <View className="flex-row items-center mt-5">
        <Text className="text-[15px] text-zinc-400">Already have an account? </Text>
        <Pressable
          className="py-2"
          onPress={() => {
            navigation.navigate("Login");
          }}
          disabled={loading}
        >
          <Text className="text-[15px] font-bold" style={{ color: "rgb(255, 40, 0)" }}>
            Log In
          </Text>
        </Pressable>
      </View>
      <ContinueAnonymously />
    </View>
  );
};

export default SignUp;
