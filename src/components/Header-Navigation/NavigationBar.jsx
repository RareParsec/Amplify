import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TouchableOpacity } from "react-native";

function NavigationBar({ state, descriptors, navigation }) {
  const navigationBarIcons = [
    { icon: "home-variant", stackName: "HomeStack" },
    { icon: "view-grid-plus", stackName: "AboutStack" },
    { icon: "plus-thick", stackName: "CreateStack" },
    { icon: "comment-processing", stackName: "NotificationsStack" },
  ];

  const navBarHeight = 90;

  return (
    <View className={`absolute left-0 bottom-0 bg-transparent w-full`}>
      {/* <BlurView
        intensity={100}
        tint="dark"
        className={`absolute bottom-0 left-0 w-full rounded-t-sm`}
        style={{ height: navBarHeight }}
      /> */}
      <View className="w-full rounded-t-sm" style={{ backgroundColor: "rgba(0,0,0,1)", height: navBarHeight }}>
        <View className={`flex-row justify-between mx-7`} style={{}}>
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
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <Pressable
                key={index}
                className="items-center mt-1 p-3 px-3 mx-1 justify-center"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                {route.name === "ProfileStack" ? (
                  <View
                    className={`h-7 w-7 items-center justify-center rounded-full border-2`}
                    style={{ borderColor: isFocused ? "#FF4500" : "#fff" }}
                  >
                    <Image src={"https://www.gstatic.com/webp/gallery/4.webp"} className="w-5 h-5 rounded-full"></Image>
                  </View>
                ) : (
                  <MaterialCommunityIcons
                    name={navigationBarIcons.find((icon) => icon.stackName === route.name).icon}
                    color={isFocused ? "rgb(	255, 40, 0)" : "#fff"}
                    size={30}
                  ></MaterialCommunityIcons>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
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
