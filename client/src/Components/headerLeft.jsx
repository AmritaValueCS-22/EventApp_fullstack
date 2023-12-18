import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { logout } from "../Redux/slices/EventAuthReducer";
import { useDispatch } from "react-redux";
import { Avatar } from "react-native-paper";

export const HeaderLeft = ({ type, route }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={{
        marginLeft: 10,
        height: 50,
        justifyContent: "center",
      }}
    >
      {type === "dashboard" && (
        <MaterialCommunityIcons
          name="view-dashboard-variant"
          color={"white"}
          size={30}
        />
      )}
      {type === "add" && <MaterialIcons name="add" color={"white"} size={25} />}
      {type === "file-excel" && (
        <FontAwesome5 name="file-excel" color={"white"} size={25} />
      )}
    </Pressable>
  );
};
export const HeaderRight = ({ type, set, role }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const getName = async () => {
    const names = await AsyncStorage.getItem("userName");
    setName(names);
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      getName();
    });
  }, [navigation]);

  const onLogOut = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userName");
    await AsyncStorage.removeItem("userRole");
    await AsyncStorage.removeItem("profileId");
    await AsyncStorage.removeItem("parentName");
    await AsyncStorage.removeItem("phoneNumber");
    set(false);
    dispatch(logout());
  };
  return (
    <View
      style={{
        marginRight: 20,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {type === "dashboard" && (
        <Pressable
          onPress={async () => {
            // await AsyncStorage.removeItem("userName");
            role === "participant" && navigation.navigate("CreateProfile");
          }}
          style={{ marginLeft: 15 }}
        >
          <Avatar.Text
            style={{ backgroundColor: "white", fontWeight: 800 }}
            color="#eac084"
            focusable
            size={34}
            label={role === "participant" ? name?.charAt(0).toUpperCase() : "O"}
          />
        </Pressable>
      )}
      {type === "dashboard" && (
        <Pressable style={{ marginLeft: 15 }} onPress={onLogOut}>
          <MaterialCommunityIcons name="power" color={"white"} size={25} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
