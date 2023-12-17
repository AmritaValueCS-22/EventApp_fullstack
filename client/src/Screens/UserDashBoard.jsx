import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Tooltip } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getAllAttedence,
  getAllNamesAction,
  getUserDetailsAction,
} from "../Redux/slices/EventAuthReducer";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

const UserDashBoard = () => {
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState("");

  const { UserData, userProfileList, loginData, userDetails, attedence } =
    useSelector((state) => state.eventAuth);

  const route = useRoute();
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const Role = await AsyncStorage.getItem("userRole");

      if (userId !== null) {
        dispatch(getUserDetailsAction(userId));
        dispatch(getAllNamesAction(userId));
      }
      if (Role === "organizer") {
        dispatch(getAllAttedence(userId));
      }
      if (Role !== null) {
        setUserRole(Role);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserDetails();
    });
  }, [navigation]);

  const onClickCard = (name) => {
    switch (name) {
      case "event":
        navigation.navigate("Event", {
          userDetails: userDetails,
          id: "1",
          userRole: userRole,
        });

        break;
      case "addevent":
        navigation.navigate("AddEvent");
        break;
      case "Attedence":
        navigation.navigate("Attedence", {
          attendence: attedence,
          userRole: userRole,
        });
        break;

      default:
        break;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",

          flex: 0.3,
          height: 200,
          width: 250,
          flexWrap: "wrap",
        }}
      >
        <Pressable onPress={() => onClickCard("event")}>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "white",
              marginHorizontal: 20,
              marginVertical: 10,
              elevation: 20,
              shadowColor: "#eebf80",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#eebf80",
              borderWidth: 0.5,
              borderRadius: 10,
            }}
          >
            <MaterialIcons color={"#eebf80"} size={30} name="event" />
            <Text style={{ color: "black", marginTop: 3 }}>Event</Text>
          </View>
        </Pressable>
        {userRole === "organizer" && (
          <>
            <Pressable onPress={() => onClickCard("addevent")}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "white",
                  marginHorizontal: 20,
                  marginVertical: 10,
                  elevation: 20,
                  shadowColor: "#eebf80",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#eebf80",
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
              >
                <MaterialIcons color={"#eebf80"} size={30} name="add" />
                <Text style={{ color: "black", marginTop: 3 }}>Add Event</Text>
              </View>
            </Pressable>
          </>
        )}
        <Pressable onPress={() => onClickCard("Attedence")}>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "white",
              marginHorizontal: 20,
              marginVertical: 10,
              elevation: 20,
              shadowColor: "#eebf80",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#eebf80",
              borderWidth: 0.5,
              borderRadius: 10,
            }}
          >
            <MaterialIcons color={"#eebf80"} size={30} name="table-chart" />
            <Text style={{ color: "black", marginTop: 3, fontSize: 13 }}>
              Attendence
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default UserDashBoard;

const styles = StyleSheet.create({});
