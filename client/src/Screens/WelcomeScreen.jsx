import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { bg } from "../constant/images";
import WelcomeComponent from "../Components/WelcomeComponent";
import AsyncStorage from "@react-native-community/async-storage";

const WelcomeScreen = () => {
  const { height, width } = Dimensions.get("screen");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <ImageBackground
        style={{
          width,
          height,
          alignItems: "center",
          justifyContent: "center",
          resizeMode: "cover",
        }}
        co
        source={bg}
      >
        <View style={{ opacity: 0.5 }} />
        <WelcomeComponent />
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
