import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

const NetworkComponent = () => {
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
        source={require("../Assets/json/internetErr.json")}
        autoPlay
        loop
        style={{ width: "50%" }}
      />
      <Text style={{ color: "black", fontSize: 15 }}>
        Please check your internet connection
      </Text>
    </View>
  );
};

export default NetworkComponent;

const styles = StyleSheet.create({});
