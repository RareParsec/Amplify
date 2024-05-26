import { View, Text, TextInput, Animated, Pressable, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SearchBar = ({ headerTitleWidth, layout }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showBg, setShowBg] = useState(false);

  // const [magnifyIconWidth, setMagnifyIconWidth] = useState(0);

  const searchBarWidth = useState(new Animated.Value(42))[0];

  const manageSearchBar = () => {
    if (!searchOpen) {
      Animated.timing(searchBarWidth, {
        toValue: layout.width - headerTitleWidth,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.cubic,
      }).start(({finished}) => {
        finished ? setShowInput(true) : '';
      }, setShowBg(true));
      setSearchOpen(true);
    } else {
      Animated.timing(searchBarWidth, {
        toValue: 42,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.cubic,
      }).start(() => setShowBg(false), setShowInput(false));
      setSearchOpen(false);
    }
  };

  return (
    <Animated.View
      className={`flex-row justify-end flex-shrink ${showBg ? "bg-zinc-900" : ""} rounded-full ml-2 `}
      style={{ width: searchBarWidth }}
    >
      {showInput ? (
        <TextInput
          className="flex-grow px-3 text-sm text-white h-fit"
          style={{ lineHeight: 18 }}
          placeholderTextColor={"white"}
          placeholder="Search"
          autoFocus={true}
          onBlur={manageSearchBar}
          keyboardAppearance="dark"
        />
      ) : (
        ""
      )}
      <Pressable className="w-fit pr-1 pl-1" onPress={manageSearchBar}>
        <MaterialCommunityIcons name="magnify" color={"#fff"} size={30} />
      </Pressable>
    </Animated.View>
  );
};
export default SearchBar;
