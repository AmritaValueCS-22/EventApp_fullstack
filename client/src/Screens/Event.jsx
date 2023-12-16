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
  getAttendenceAction,
  getEventDetailsAction,
} from "../Redux/slices/EventAuthReducer";

import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import Calender from "../Components/Calender";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import AddEvent from "./AddEvent";
import RefreshScreen from "./RefreshScreen";
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
    logged: false,
    selectedEvent: {},
  };
};

function Event() {
  const { eventDetails, attedence, refresh } = useSelector(
    (state) => state.eventAuth
  );
  const [state, setState] = useState(initialState());
  const { width } = Dimensions.get("screen");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const { openModel, checked, cardClr, isOpenEdit, selectedEvent } = state;
  const navigation = useNavigation();

  const getUserDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const Role = await AsyncStorage.getItem("userRole");
      const profileId = await AsyncStorage.getItem("profileId");

      if (userId !== null) {
        dispatch(getEventDetailsAction({ userId: userId, id: profileId }));
        dispatch(getAllNamesAction({ userId: userId }));
        dispatch(getAttendenceAction({ userId: userId, id: profileId }));
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
  console.log(refresh, "refresh");
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
  const onHandleRefresh = async () => {
    const profileId = await AsyncStorage.getItem("profileId");
    const userId = await AsyncStorage.getItem("userId");

    dispatch(getEventDetailsAction({ userId: userId, id: profileId }));
    dispatch(getAllNamesAction({ userId: userId }));
    dispatch(getAttendenceAction({ userId: userId, id: profileId }));
  };
  const onSubmitReason = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("profileId");
      const userId = await AsyncStorage.getItem("userId");
      const name = await AsyncStorage.getItem("userName");
      const phoneNumber = await AsyncStorage.getItem("phoneNumber");

      const newAttedence = {
        eventName: state.items.eventName,
        startDate: state.items.startDate,
        endDate: state.items.endDate,
        reason:
          checked === "yes"
            ? ""
            : state.reason === "Other reason"
            ? state.otherReason
            : state.reason,
        attendance: checked,
        id: id,
        token: value,
        eventId: state.items.eventId,
        phoneNumber,
        name,
      };
      console.log(newAttedence);

      dispatch(addAttedence(newAttedence));
      dispatch(getEventDetailsAction({ userId: userId, id: id }));
      dispatch(getAttendenceAction({ userId: userId, id: id }));

      setState((prev) => ({
        ...prev,
        openModel: false,
        error: true,
        selectedReason: 0,
        diableAttedence: true,
        logged: true,
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
  const showmodel = (item) => {
    setState((prev) => ({
      ...prev,
      isOpenEdit: !state.isOpenEdit,
      selectedEvent: item,
    }));
  };
  return (
    <SafeAreaView style={styles.container}>
      {refresh ? (
        <RefreshScreen />
      ) : (
        <>
          <Calender
            showmodel={showmodel}
            onHandleClick={onHandleClick}
            role={role}
            logged={state.logged}
          />
          <View style={{ width, alignItems: "flex-end" }}>
            <Pressable
              style={{
                width: 100,
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                height: 40,
                marginBottom: 15,
                shadowColor: "#eebf80",
                elevation: 15,
                borderRadius: 20,
                padding: 1,
              }}
              onPress={onHandleRefresh}
            >
              <EvilIcons name="refresh" size={25} color={"#eebf80"} />
              <Text style={{ color: "#eebf80", fontSize: 18 }}>Refresh</Text>
            </Pressable>
          </View>

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
                          style={{
                            fontSize: 15,
                            color: "black",
                            fontWeight: 700,
                          }}
                        >
                          Reason
                        </Text>
                        <View style={{}}>
                          {reason.map((item) => {
                            return (
                              <Chip
                                key={item.id}
                                style={{ width: 300, marginVertical: 10 }}
                                onPress={() =>
                                  onChooseReason(item.reason, item.id)
                                }
                                selected={item.id === state.selectedReason}
                                selectedColor={
                                  item.id === state.selectedReason
                                    ? "red"
                                    : "black"
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
                            <Text style={{ color: "red" }}>
                              Enter the reason
                            </Text>
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
            onBackButtonPress={() =>
              setState((prev) => ({
                ...prev,
                isOpenEdit: false,
              }))
            }
            onBackdropPress={() =>
              setState((prev) => ({
                ...prev,
                isOpenEdit: false,
              }))
            }
            style={{ alignItems: "center" }}
            children={
              <View
                style={{
                  width: width,
                  flex: 0.7,
                  // backgroundColor: "white",
                  alignItems: "center",
                }}
              >
                <AddEvent setState={setState} item={selectedEvent} isEdit />
              </View>
            }
          />
        </>
      )}
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
