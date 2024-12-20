import { View, Text, TextInput, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import React from "react";

const CredentialFields = ({ handleChange, emailValue, passwordValue }) => {
  const { error, loading } = useSelector((state) => state.auth);

  return (
    <View>
      {/** Email */}
      <View className="flex-row mb-1 w-full">
        <View className="justify-start mt-3">
          <MaterialCommunityIcons name="account" color={"white"} size={30} />
        </View>
        <View className="ml-4 flex-col">
          <TextInput
            className="border-b border-zinc-800 rounded-md w-72 px-2 text-[17px] py-2 text-zinc-300"
            keyboardAppearance="dark"
            name="email"
            value={emailValue}
            onChangeText={(text) => handleChange("email", text)}
          />
          <Text className="text-[11px] mx-1 text-zinc-400 tracking-[2px] font-semibold w-fit">Email</Text>
          <View className="min-h-[28]">
            {error &&
              error.map((error, index) => {
                if (error?.errorType === "email") {
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
        </View>
      </View>
      {/** Password */}
      <View className="flex-row w-full">
        <View className="justify-start mt-3">
          <MaterialCommunityIcons name="key" color={"white"} size={30} />
        </View>
        <View className=" ml-4 flex-1">
          <TextInput
            className="border-b border-zinc-800 rounded-md w-72 px-2 text-[17px] py-2 text-zinc-300"
            keyboardAppearance="dark"
            name="password"
            value={passwordValue}
            onChangeText={(text) => handleChange("password", text)}
          ></TextInput>
          <Text className="text-[11px] mx-1 text-zinc-400 tracking-[2px] font-semibold w-fit">Password</Text>
          <View className="min-h-[28]">
            {error &&
              error.map((error, index) => {
                if (error?.errorType === "password") {
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
        </View>
      </View>
    </View>
  );
};

export default CredentialFields;
