import { View, Text, Pressable, Image, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setScrollingDown } from "../../redux/slices/globalVariablesSlice";

function NavigationBar({ state, descriptors, navigation }) {
  const dispatch = useDispatch();
  const { scrollingDown } = useSelector((state) => state.globalVariables);

  const animation = useState(new Animated.Value(0))[0];

  const navigationBarIcons = [
    {
      iconType: "Ionicons",
      iconOutline: "home-outline",
      iconFilled: "home",
      stackName: "HomeStack",
    },
    {
      iconType: "Ionicons",
      iconOutline: "grid-outline",
      iconFilled: "grid",
      stackName: "AboutStack",
    },
    {
      iconType: "MaterialCommunityIcons",
      iconOutline: "plus",
      iconFilled: "plus",
      stackName: "CreateStack",
    },
    {
      iconType: "Ionicons",
      iconOutline: "chatbox-outline",
      iconFilled: "chatbox",
      stackName: "NotificationsStack",
    },
  ];

  useEffect(() => {
    Animated.timing(animation, {
      //1 = scrolling down
      toValue: scrollingDown ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [scrollingDown]);

  const navBarHeight = 75;

  return (
    <View className={`absolute left-0 bottom-0 bg-transparent w-full items-center`}>
      <View className={`w-[95%] h-[1] bg-zinc-800`}></View>
      <BlurView
        intensity={scrollingDown ? 5 : 25}
        tint="dark"
        className={`absolute bottom-0 left-0 w-full rounded-t-sm`}
        style={{ height: navBarHeight }}
      />
      <Animated.View
        className="w-full"
        style={{
          backgroundColor: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(10,10,10,0.9)", "rgba(10,10,10,0.55)"],
          }),
          height: navBarHeight,
        }}
      >
        <View className={`flex-row justify-between w-full px-4`} style={{}}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              dispatch(setScrollingDown(false));
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              dispatch(setScrollingDown(false));
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            const icon = navigationBarIcons.find((icon) => icon.stackName === route.name);

            return (
              <Animated.View
                key={index}
                style={{
                  opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] }),
                }}
              >
                <Pressable
                  className={`items-center h-[50] w-[60] justify-center`}
                  style={{}}
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                >
                  {route.name === "ProfileStack" ? (
                    <View
                      className={`items-center justify-center rounded-full ${
                        isFocused ? "border-[3px] h-8 w-8" : "border h-7 w-7"
                      }`}
                      style={{ borderColor: isFocused ? "rgb(255, 255, 255)" : "rgb(255, 255, 255)" }}
                    >
                      <Image
                        src={"https://www.gstatic.com/webp/gallery/4.webp"}
                        className={`${isFocused ? "h-6 w-6" : "w-6 h-6"} rounded-full`}
                      ></Image>
                    </View>
                  ) : (
                    <View className="">
                      {icon.iconType === "MaterialCommunityIcons" ? (
                        <MaterialCommunityIcons
                          name={isFocused ? icon.iconFilled : icon.iconOutline}
                          color={isFocused ? "rgb(255, 255, 255)" : "rgb(255, 255, 255)"}
                          size={isFocused ? 38 : 30}
                        />
                      ) : icon.iconType === "Ionicons" ? (
                        <Ionicons
                          name={isFocused ? icon.iconFilled : icon.iconOutline}
                          color={isFocused ? "rgb(255, 255, 255)" : "rgb(255, 255, 255)"}
                          size={isFocused ? 26 : 22}
                        />
                      ) : (
                        ""
                      )}
                    </View>
                  )}
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}

// const NavigationBar = ({ navigation }) => {
// const navigationBarButtons = [
//   { icon: "home", component: "Home" },
//   { icon: "book", component: "About" },
//   { icon: "plus", component: "add" },
//   { icon: "customerservice", component: "heart" },
//   { icon: "notification", component: "user" },
// ];

//   return (
//     <>
//       <BlurView intensity={100} tint="dark" className="absolute h-[80] bottom-0 left-0 w-full" />
//       <View className="absolute bottom-0 left-0 w-full h-[80] opacity-70 border-t-2 border-gray-900 bg-black">
//         <View className="flex-row justify-between mx-7 items-center mt-3">
//           {navigationBarButtons.map(({ icon, component }, index) => (
//             <Pressable key={index} className="" onPress={() => navigation.navigate(`${component}`)}>
//               <IconAntDesign name={icon} color={"#fff"} size={25}></IconAntDesign>
//             </Pressable>
//           ))}
//         </View>
//       </View>
//     </>
//   );
// };

export default NavigationBar;
