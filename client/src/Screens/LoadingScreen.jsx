import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [state, set] = useState(true);
  useEffect(() => {
    const x = setTimeout(() => {
      set(false);
    }, 3000);
    return () => {
      clearTimeout(x);
    };
  }, [state]);

  return (
    state && (
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <Text>LoadingScreen</Text>
      </View>
    )
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
