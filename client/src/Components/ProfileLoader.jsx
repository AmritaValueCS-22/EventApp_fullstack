import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

const ProfileLoader = () => {
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
        source={require("../Assets/json/loadingR.json")}
        autoPlay
        loop
        style={{ width: "35%" }}
      />
    </View>
  );
};

export default ProfileLoader;

const styles = StyleSheet.create({});
