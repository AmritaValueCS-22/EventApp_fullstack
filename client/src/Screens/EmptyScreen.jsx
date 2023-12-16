import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

const EmptyScreen = ({ title }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "whitesmoke",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedLottieView
        source={require("../Assets/json/empty.json")}
        autoPlay
        loop
        style={{ width: "50%" }}
      />
      <View>
        <Text style={{ color: "black", fontSize: 18 }}>{title}</Text>
      </View>
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({});
