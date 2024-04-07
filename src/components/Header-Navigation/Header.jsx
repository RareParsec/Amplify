import { View, Text, Image, TextInput, Platform, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SearchBar from "../Search/SearchBar";

const Header = ({ route, layout }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [headerTitleWidth, setHeaderTitleWidth] = useState(0);

  const profileMenuItems = ["Profile", "History", "Settings"];

  return (
    <>
      <View>
        <View className={`w-full ${Platform.OS === "ios" ? "h-[125]" : "h-[50]"} bg-black justify-end`}>
          <View className="flex-row items-center justify-between mb-2 h-10">
            <Text
              className="font-bold text-white text-[33px] pl-7"
              onLayout={(e) => {
                setHeaderTitleWidth(e.nativeEvent.layout.width);
              }}
            >
              {route.name.substring(0, route.name.length - 5)}
            </Text>
            <SearchBar headerTitleWidth={headerTitleWidth} layout={layout} />
          </View>
        </View>
        <StatusBar barStyle="default" />
      </View>
      {/* Profile Bar Menu */}

      {/* {profileMenuOpen ? (
        <View className="h-fit w-full absolute bg-black right-0 flex-row top-[100] border-t border-gray-900">
          <View className="flex-grow justify-center items-end">
            <Image src={"https://www.gstatic.com/webp/gallery/4.webp"} className="w-14 h-14 rounded-full"></Image>
          </View>
          <View className="w-32 ml-auto justify-center">
            {profileMenuItems.map((item, index) => (
              <Text key={index} className="text-white w-32 text-center font-light text-lg tracking-widest py">
                {item}
              </Text>
            ))}
          </View>
        </View>
      ) : (
        ""
      )} */}
    </>
  );
};

export default Header;
