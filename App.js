import { View, Text, StatusBar, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationBar from "./src/components/Header-Navigation/NavigationBar";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/pages/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import About from "./src/pages/About";
import Profile from "./src/pages/Profile";
import Create from "./src/pages/Create";
import Notifications from "./src/pages/Notifications";
import Header from "./src/components/Header-Navigation/Header";
import Search from "./src/pages/Search";

const App = () => {
  const tab = createBottomTabNavigator();

  const HomeStack = createNativeStackNavigator();
  const AboutStack = createNativeStackNavigator();
  const ProfileStack = createNativeStackNavigator();
  const CreateButtonStack = createNativeStackNavigator();
  const NotificationsStack = createNativeStackNavigator();

  const HomeStackNavigator = () => (
    <HomeStack.Navigator screenOptions={{ headerShown: false, animation: "simple_push" }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Search" component={Search} />
    </HomeStack.Navigator>
  );

  const AboutStackNavigator = () => (
    <AboutStack.Navigator screenOptions={{ headerShown: false, animation: "simple_push" }}>
      <AboutStack.Screen name="About" component={About} />
    </AboutStack.Navigator>
  );

  const ProfileStackNavigator = () => (
    <ProfileStack.Navigator screenOptions={{ headerShown: false, animation: "simple_push" }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );

  const CreateButtonStackNavigator = () => (
    <CreateButtonStack.Navigator screenOptions={{ headerShown: false, animation: "simple_push" }}>
      <CreateButtonStack.Screen name="Create" component={Create} />
    </CreateButtonStack.Navigator>
  );

  const NotificationsStackNavigator = () => (
    <NotificationsStack.Navigator screenOptions={{ headerShown: false, animation: "simple_push" }}>
      <NotificationsStack.Screen name="Notifications" component={Notifications} />
    </NotificationsStack.Navigator>
  );

  return (
    <>
      <NavigationContainer>
        <tab.Navigator
          screenOptions={{ header: (props) => <Header {...props} /> }}
          tabBar={(props) => <NavigationBar {...props} />}
          initialRouteName="HomeStack"
        >
          <tab.Screen name="HomeStack" component={HomeStackNavigator} />
          <tab.Screen name="AboutStack" component={AboutStackNavigator} />
          <tab.Screen name="CreateStack" component={CreateButtonStackNavigator} />
          <tab.Screen name="NotificationsStack" component={NotificationsStackNavigator} />
          <tab.Screen name="ProfileStack" component={ProfileStackNavigator} />
        </tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
