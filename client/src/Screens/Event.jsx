import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Chip, RadioButton, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";

import ReactNativeModal from "react-native-modal";
import { reason } from "../data/profileData";
import {
  addAttedence,
  getAllNamesAction,
  getEventDetailsAction,
} from "../Redux/slices/EventAuthReducer";

import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import Calender from "../Components/Calender";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const initialState = () => {
  return {
    openModel: false,
    checked: "yes",
    cardClr: "#63b467",
    reasonModal: false,
    reason: "",
    otherReason: "",
    selectedReason: 0,
    items: {},
    diableAttedence: false,
    error: false,
    isOpenEdit: false,
  };
};

function Event() {
  const { eventDetails } = useSelector((state) => state.eventAuth);
  const [state, setState] = useState(initialState());
  const { width } = Dimensions.get("screen");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const { openModel, checked, cardClr, isOpenEdit } = state;
  const navigation = useNavigation();
  const route = useRoute();

  const getUserDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const Role = await AsyncStorage.getItem("userRole");
      const profileId = await AsyncStorage.getItem("profileId");

      if (userId !== null) {
        dispatch(getEventDetailsAction({ userId: userId, id: profileId }));
        dispatch(getAllNamesAction({ userId: userId }));
      }
      if (Role === "organizer") {
        // dispatch(getAllAttedence(userId));
      }
      if (Role !== null) {
        setRole(Role);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  const onHandleClick = (items) => {
    setState((prev) => ({
      ...prev,
      openModel: true,
      items,
    }));
  };

  const onHandleClose = () => {
    setState((prev) => ({
      ...prev,
      openModel: false,
      isOpenEdit: false,
    }));
  };

  const onHandleSelectReason = () => {
    setState((prev) => ({
      ...prev,
      openModel: false,
    }));
  };

  const onChooseReason = (reason, id) => {
    setState((prev) => ({
      ...prev,
      reason,
      selectedReason: id,
    }));
  };

  const onSubmitReason = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("profileId");
      const userId = await AsyncStorage.getItem("userId");

      const newAttedence = {
        eventName: state.items.eventName,
        startDate: state.items.startDate,
        endDate: state.items.endDate,
        reason: checked
          ? ""
          : state.reason === "Other reason"
          ? state.otherReason
          : state.reason,
        attedence: checked,
        id: id,
        token: value,
        eventId: state.items.eventId,
      };
      console.log("ee");
      dispatch(addAttedence(newAttedence));
      dispatch(getEventDetailsAction({ userId: userId, id: id }));

      setState((prev) => ({
        ...prev,
        openModel: false,
        error: true,
        selectedReason: 0,
        diableAttedence: true,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserDetails();
    });
  }, [navigation]);
  const showmodel = () => {
    setState((prev) => ({
      ...prev,
      isOpenEdit: !state.isOpenEdit,
    }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Calender
        showmodel={showmodel}
        onHandleClick={onHandleClick}
        role={role}
      />
      <ReactNativeModal
        isVisible={openModel}
        swipeDirection="left"
        onBackButtonPress={onHandleClose}
        onBackdropPress={onHandleClose}
        children={
          <>
            <View
              style={{
                backgroundColor: "white",
                height:
                  checked === "yes"
                    ? 210
                    : state.reason === "Other reason"
                    ? 580
                    : 500,
                borderRadius: 40,
                alignItems: "center",
                position: "absolute",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  backgroundColor: cardClr,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  color: "white",
                  width: width - 40,
                  height: 50,
                  alignItems: "center",
                  paddingTop: 10,
                }}
              >
                Planning to attend the event ?
              </Text>
              <Text style={{ color: "black", fontSize: 20 }}></Text>
              <View
                style={{
                  height: 100,
                  width: 110,
                  flexDirection: "row",
                  //   alignItems: "center",

                  justifyContent: "space-between",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Entypo size={35} color={"#63b467"} name="thumbs-up" />

                  <RadioButton
                    value="yes"
                    color="#63b467"
                    status={checked === "yes" ? "checked" : "unchecked"}
                    onPress={() =>
                      setState((prev) => ({
                        ...prev,
                        checked: "yes",
                        cardClr: "#63b467",
                      }))
                    }
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Entypo size={35} color={"#f74d49"} name="thumbs-down" />

                  <RadioButton
                    value="no"
                    color="#f74d49"
                    status={checked === "no" ? "checked" : "unchecked"}
                    onPress={() =>
                      setState((prev) => ({
                        ...prev,
                        checked: "no",
                        cardClr: "#f74d49",
                      }))
                    }
                  />
                </View>
              </View>
              {checked === "no" && (
                <Pressable onPress={onHandleSelectReason}>
                  <View style={{ marginHorizontal: 5, marginVertical: 5 }}>
                    <Text
                      style={{ fontSize: 15, color: "black", fontWeight: 700 }}
                    >
                      Reason
                    </Text>
                    <View style={{}}>
                      {reason.map((item) => {
                        return (
                          <Chip
                            key={item.id}
                            style={{ width: 300, marginVertical: 10 }}
                            onPress={() => onChooseReason(item.reason, item.id)}
                            selected={item.id === state.selectedReason}
                            selectedColor={
                              item.id === state.selectedReason ? "red" : "black"
                            }
                          >
                            {item.reason}
                          </Chip>
                        );
                      })}
                    </View>
                  </View>
                  {state.reason === "Other reason" && (
                    <View>
                      <Text
                        style={{
                          color: "black",
                          marginLeft: 5,
                          fontWeight: 800,
                          marginBottom: 15,
                        }}
                      >
                        Other Reason
                      </Text>
                      <TextInput
                        onChangeText={(text) =>
                          setState((prev) => ({
                            ...prev,
                            otherReason: text,
                          }))
                        }
                        placeholder="Type the Reason"
                      />
                      {state.error && (
                        <Text style={{ color: "red" }}>Enter the reason</Text>
                      )}
                    </View>
                  )}
                </Pressable>
              )}

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  backgroundColor: cardClr,
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                  color: "white",
                  width: width - 40,
                  height: 50,

                  paddingTop: 10,
                  position: "absolute",
                  bottom: 0,
                }}
                onPress={onSubmitReason}
              >
                Submit
              </Text>
            </View>
          </>
        }
      />
      <ReactNativeModal
        isVisible={isOpenEdit}
        swipeDirection="left"
        onBackButtonPress={onHandleClose}
        onBackdropPress={onHandleClose}
        children={
          <View
            style={{
              width: width - 40,
              flex: 0.8,
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flex: 0.1,
                backgroundColor: "#eebf80",
                alignItems: "center",
                paddingLeft: 15,
                flexDirection: "row",
              }}
            >
              <MaterialCommunityIcons
                size={23}
                color={"white"}
                name="circle-edit-outline"
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: 20,
                  marginLeft: 5,
                }}
              >
                Edit event
              </Text>
            </View>
            <View style={{ flex: 0.9 }}>
              <TextInput />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: "#888",
    fontSize: 16,
  },
});

export default Event;
