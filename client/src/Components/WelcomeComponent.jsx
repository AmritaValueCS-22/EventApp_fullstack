import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const WelcomeComponent = () => {
  const navigation = useNavigation();
  const onHandleLogin = () => {
    navigation.navigate("Login");
  };
  const onHandleSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View
      style={{
        zIndex: 50,
        height: "100%",
        justifyContent: "center",
        marginTop: 300,
      }}
    >
      <View
        style={{
          alignItems: "center",

          height: 250,
          marginBottom: 100,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <Icon
            style={{ marginVertical: 5 }}
            size={50}
            color="white"
            name="waveform"
          />

          <Text style={{ color: "white", fontSize: 15, fontWeight: 500 }}>
            There are no wrong answers, only {"\n"}{" "}
            <Text style={{ color: "#ef8906", fontSize: 30, fontWeight: 700 }}>
              Learning opportunities.
            </Text>
          </Text>
        </View>

        <View>
          <Button onPress={onHandleLogin} style={styles.btn}>
            <Text style={{ color: "#ef8906" }}>Login</Text>
          </Button>
          <Button onPress={onHandleSignUp} style={styles.btn}>
            <Text style={{ color: "#ef8906" }}>Sign Up</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default WelcomeComponent;

const styles = StyleSheet.create({
  btn: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    width: 250,
    marginVertical: 5,
  },
});
