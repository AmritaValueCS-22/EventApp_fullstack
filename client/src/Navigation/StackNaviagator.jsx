import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../Screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import SignUpScreen from "../Screens/SignUpScreen";
import LoginScreen from "../Screens/LoginScreen";
import CreateProfile from "../Screens/CreateProfile";
import EditProfileScreen from "../Screens/EditProfileScreen";

import Event from "../Screens/Event";
import UserDashBoard from "../Screens/UserDashBoard";
import Header from "../Components/Header";
import { HeaderLeft, HeaderRight } from "../Components/headerLeft";
import AddEvent from "../Screens/AddEvent";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import SplashScreen from "../Screens/splashScreen";
import LoadingScreen from "../Screens/LoadingScreen";
import AttedenceScreen from "../Screens/AttedenceScreen";
import BottomNavigator from "./BottomNavigator";
import ResetPassword from "../Screens/ResetPassword";

const StackNaviagator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const [isLoggedIn, set] = useState(false);
  const [role, setRole] = useState("");

  const { loginData, showSplash, isLoading, refresh } = useSelector(
    (state) => state.eventAuth
  );
  const config = {
    screens: {
      ResetPassword: "reset/:token",
    },
  };

  const linking = {
    prefixes: ["http://memo.com", "memo://"],
    config,
  };
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      const Role = await AsyncStorage.getItem("userRole");

      if (value !== null) {
        set(true);
      }
      if (Role !== null) {
        setRole(Role);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };
  useEffect(() => {
    readData();
  }, [isLoading]);

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            {loginData.userRole === "participant" && (
              <>
                <Stack.Screen
                  name="CreateProfile"
                  component={CreateProfile}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="EditProfile"
                  component={EditProfileScreen}
                  options={{ headerShown: true }}
                />
              </>
            )}

            <Stack.Screen
              name="BottomNavigator"
              children={() => <BottomNavigator set={set} role={role} />}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            {showSplash && (
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
            )}

            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNaviagator;

const styles = StyleSheet.create({});
