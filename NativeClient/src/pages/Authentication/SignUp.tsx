import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import zxcvbn from "zxcvbn";
import { clearError, clearLoading, setError, setLoading, signUpFirebase } from "../../redux/slices/authSlice.js";
import CredentialFields from "./components/CredentialFields.jsx";
import axios from "../../config/axios.config.js";
import ContinueWithGoogle from "./components/ContinueWithGoogle.jsx";
import ContinueAnonymously from "./components/ContinueAnonymously.jsx";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import InputPassword from "./components/InputPassword";
import InputText from "./components/InputText";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  type FormFields = {
    email: string;
    password: string;
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({ defaultValues: { email: "", password: "" } });

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
    <SafeAreaView className="flex-1 items-center bg-black">
      <Text className="text-[45px] font-bold text-center" style={{ color: "rgb(	255, 40, 0)" }}>
        Sign Up
      </Text>

      <View className="w-[80%] mt-24">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="account" color={"white"} size={30} />
          <Controller
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                style={"border-b border-zinc-800 rounded-md px-2 text-[17px] py-2 text-zinc-300 flex-1"}
                props={{ onBlur, value, onChangeText: onChange }}
              />
            )}
            name="email"
          />
        </View>
        <View className="flex-row mt-10 items-center">
          <MaterialCommunityIcons name="key" color={"white"} size={30} />
          <Controller
            control={control}
            rules={{
              maxLength: { value: 20, message: "Password must not exceed 20 characters"},
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              required: true,
              validate: ((value) => {return zxcvbn(value).score > 1 || "Password is too weak"}),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputPassword
                style={"border-b border-zinc-800 rounded-md px-2 text-[17px] py-2 text-zinc-300 flex-1"}
                props={{ onBlur, value, onChangeText: onChange }}
              />
            )}
            name="password"
          />
        </View>
        <Pressable className="px-10 py-2 rounded-md mt-8 border border-zinc-800" onPress={handleSubmit(handleContinue)}>
          <Text className="text-center font-bold text-white text-[20px]"> {isSubmitting ? "Loading" : "Continue"}</Text>
        </Pressable>
        <View className="justify-center mt-24 items-center mb-10">
          <View className="w-80 border-b border-zinc-900"></View>
          <Text className="absolute text-white bg-black px-4">Or</Text>
        </View>
        <ContinueWithGoogle navigation={navigation} disabled={isSubmitting} />

        <View className="flex-row items-center mt-5">
          <Text className="text-[15px] text-zinc-400">Already have an account? </Text>
          <Pressable
            className="py-2"
            onPress={() => {
              navigation.navigate("Login");
            }}
            disabled={isSubmitting}
          >
            <Text className="text-[15px] font-bold" style={{ color: "rgb(255, 40, 0)" }}>
              Log In
            </Text>
          </Pressable>
        </View>
        <ContinueAnonymously disabled={isSubmitting} />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

// <View className={`items-center pb-7 w-[85%] mt-48`}>
//       {/** Title */}
//       <Text className="text-[45px] font-bold mb-8 text-center" style={{ color: "rgb(	255, 40, 0)" }}>
//         Sign Up
//       </Text>

//       {/** Continue */}

//       <>
//         {/** Email&Password */}
//         <CredentialFields handleChange={handleChange} emailValue={email} passwordValue={password} />
//         {/** Submit */}
//         <Pressable
//           className="px-10 py-2 rounded-md mt-4 border border-zinc-800"
//           onPress={handleContinue}
//           disabled={loading}
//         >
//           <Text className="text-center font-bold text-white text-[20px]"> {loading ? "Loading" : "Continue"}</Text>
//         </Pressable>
//       </>
//     </View>

//     <>
//       {/** Or */}
//       <View className="justify-center mt-4 mb-12 items-center">
//         <View className="w-80 border-b border-zinc-900"></View>
//         <Text className="absolute text-white bg-black px-4">Or</Text>
//       </View>
//       {/** Google */}
//       <ContinueWithGoogle navigation={navigation} />
//     </>

//     {/** Log in */}
//     <View className="flex-row items-center mt-5">
//       <Text className="text-[15px] text-zinc-400">Already have an account? </Text>
//       <Pressable
//         className="py-2"
//         onPress={() => {
//           navigation.navigate("Login");
//         }}
//         disabled={loading}
//       >
//         <Text className="text-[15px] font-bold" style={{ color: "rgb(255, 40, 0)" }}>
//           Log In
//         </Text>
//       </Pressable>
//     </View>
//     <ContinueAnonymously />
