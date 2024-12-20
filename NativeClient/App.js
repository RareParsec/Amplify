import { View, Text, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "./src/config/FirebaseConfig.js";
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
import Login from "./src/pages/Authentication/Login";
import Loading from "./src/pages/Misc/Loading";
import SignUp from "./src/pages/Authentication/SignUp";
import { persistor, store } from "./src/redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SelectUsername from "./src/pages/Authentication/SelectUsername";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, signOut, revertToIntialState } from "./src/redux/slices/authSlice.js";
import axios from "./src/config/axios.config.js";
import VerifyEmail from "./src/pages/Authentication/VerifyEmail";

const App = () => {
  const Main = createBottomTabNavigator();

  const HomeStack = createNativeStackNavigator();
  const AboutStack = createNativeStackNavigator();
  const ProfileStack = createNativeStackNavigator();
  const CreateButtonStack = createNativeStackNavigator();
  const NotificationsStack = createNativeStackNavigator();

  const AuthStack = createNativeStackNavigator();

  const [user, setUser] = useState(null);
  const [userClaims, setUserClaims] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { accessGranted, error } = useSelector((state) => state.auth);

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

  useEffect(() => {
    // dispatch(signOut());

    const unsubscribeIdToken = auth.onIdTokenChanged(async (user) => {
      // console.log("IdTokenChanged");
      if (user) {
        try {
          await user.getIdToken(true);
          const idToken = await user.getIdTokenResult();
          setUserClaims(idToken.claims);
        } catch (error) {
          console.log(error);
        }
      }
    });

    const unsubscribeAuthState = auth.onAuthStateChanged(async (user) => {
      console.log("AuthStateChanged");
      await dispatch(revertToIntialState());
      setUser(user);

      if (user) {
        const responseUsername = await axios
          .post(`/api/auth/get_username_by_firebase_id`, { firebase_id: user.uid })
          .catch((err) => {
            console.log(err);
          });

        dispatch(setCurrentUser({ firebase_id: user.uid, username: responseUsername.data.username, email: user.email }));
      } else {
        dispatch(setCurrentUser({ firebase_id: null, username: null, email: null }));
      }

      if (loading) {
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuthState(), unsubscribeIdToken();
    };
  }, []);

  // useEffect(() => {
  //   console.log("AccessGranted was updated.");

  //   const asyncFunc = async () => {
  //     try {
  //       if (!user) return;
  //       await user.getIdToken(true);
  //       const idToken = await user.getIdTokenResult();
  //       setUserClaims(idToken.claims);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   asyncFunc();
  // }, [accessGranted]);

  // useEffect(() => {
  //   console.log(userClaims?.accessGranted);
  // }, [userClaims?.accessGranted]);

  return (
    <NavigationContainer>
      {console.log('rendering')}
      {((user && userClaims?.accessGranted === true) || user?.isAnonymous) ? (
        <Main.Navigator
          screenOptions={{ header: (props) => <Header {...props} /> }}
          tabBar={(props) => <NavigationBar {...props} />}
          initialRouteName="HomeStack"
        >
          <Main.Screen name="HomeStack" component={HomeStackNavigator} />
          <Main.Screen name="AboutStack" component={AboutStackNavigator} />
          <Main.Screen name="CreateStack" component={CreateButtonStackNavigator} />
          <Main.Screen name="NotificationsStack" component={NotificationsStackNavigator} />
          <Main.Screen name="ProfileStack" component={ProfileStackNavigator} />
        </Main.Navigator>
      ) : !loading ? (
        <AuthStack.Navigator
          screenOptions={{ headerShown: false, animation: "none" }}
          initialRouteName={user ? "Login" : "SignUp"}
        >
          <AuthStack.Screen name="VerifyEmail" component={VerifyEmail} />
          <AuthStack.Screen name="SelectUsername" component={SelectUsername} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
        </AuthStack.Navigator>
      ) : (
        <Loading />
      )}
    </NavigationContainer>
  );
};

export { App };

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default Root;
