import { View, Text, Image, TextInput, Platform, Pressable, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SearchBar from "../Search/SearchBar";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ route, layout, navigation }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [headerTitleWidth, setHeaderTitleWidth] = useState(0);

  const dispatch = useDispatch();
  const { scrollingDown } = useSelector((state) => state.globalVariables);

  const animation = useState(new Animated.Value(0))[0];

  const profileMenuItems = ["Profile", "History", "Settings"];

  useEffect(() => {
    Animated.timing(animation, {
      //1 = scrolling down
      toValue: scrollingDown ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [scrollingDown]);

  return (
    <>
      <Animated.View
        className={`absolute w-full justify-end items-center`}
        style={{
          height: animation.interpolate({ inputRange: [0, 1], outputRange: [125, 100] }),
          backgroundColor: "rgb(8, 11, 15)",
        }}
      >
        <View className="flex-row items-center justify-between mb-1 h-10 w-full">
          <Animated.Text
            className="font-bold text-white pl-7"
            style={{ fontSize: animation.interpolate({ inputRange: [0, 1], outputRange: [33, 25] }) }}
            onLayout={(e) => {
              setHeaderTitleWidth(e.nativeEvent.layout.width);
            }}
          >
            {route.name == "CreateStack" ? (
              <Pressable onPress={()=>{navigation.navigate('HomeStack')}}>
                <Text className="text-white text-[20px] ml-4">X</Text>
              </Pressable>
            ) : (
              ""
            )}
            {route.name.substring(0, route.name.length - 5)}
          </Animated.Text>
          <SearchBar headerTitleWidth={headerTitleWidth} layout={layout} />
        </View>
        <View className="h-[1] w-[95%] bg-zinc-900"></View>
      </Animated.View>
      <StatusBar barStyle="default" />
    </>
  );
};

export default Header;
