import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

const RefreshScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedLottieView
        source={require("../Assets/json/loading.json")}
        autoPlay
        loop
        style={{ width: "50%" }}
      />
    </View>
  );
};

export default RefreshScreen;

const styles = StyleSheet.create({});
