import { View, Text, Dimensions } from "react-native";
import React from "react";

const Header = (props) => {
  const { width } = Dimensions.get("screen");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: width - 70,
        height: 80,
        backgroundColor: props.color,
        borderBottomEndRadius: 80,
        paddingLeft: 15,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
        {props.name}
      </Text>
    </View>
  );
};

export default Header;
