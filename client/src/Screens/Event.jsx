import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Chip, Modal, RadioButton, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwsom5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ReactNativeModal from "react-native-modal";
import { reason } from "../data/profileData";
import {
  addAttedence,
  getUserDetailsAction,
  updateReason,
} from "../Redux/slices/EventAuthReducer";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
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
  };
};

function Event() {
  const { userDetails, loginData } = useSelector((state) => state.eventAuth);
  const navigation = useNavigation();
  const route = useRoute();
  const [events, setEvent] = useState({});
  const getDifferDate = (start, end) => {
    const dates = [];
    const currentDate = moment(start);

    while (currentDate.isSameOrBefore(end)) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "days");
    }
    return dates;
  };

  const getEventFormat = async () => {
    const userRole = await AsyncStorage.getItem("userRole");

    const result = {};

    const isuserRole =
      userRole === "organizer"
        ? route.params.userDetails.userEvents
        : route.params.userDetails.user.events;
    isuserRole.forEach((event) => {
      const dates = getDifferDate(event.startDate, event.endDate);
      const currentDate = moment().format("YYYY-MM-DD");
      console.log(event, "evenet");
      dates.forEach((date) => {
        if (!result[date]) {
          result[date] = [];
        }

        result[date].push({
          location: event.location,
          eventName: event.eventName,
          startTime: event.startTime,
          endTime: event.endTime,
          startDate: event.startDate,
          endDate: event.endDate,
          isLog: moment(currentDate).isSame(moment(date)) ? true : false,
          eventId: event.eventId,
        });
      });
    });

    setEvent(result);
  };
  useEffect(() => {
    getEventFormat();
  }, []);
  const [state, setState] = useState(initialState());
  const { width } = Dimensions.get("screen");

  const dispatch = useDispatch();
  const { openModel, checked, cardClr } = state;
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
      if (state.reason === "Other reason" && state.otherReason === "") {
        setState((prev) => ({
          ...prev,
          error: true,
        }));
      } else {
        const value = await AsyncStorage.getItem("token");
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
          id: route.params.id,
          token: value,
          eventId: state.items.eventId,
        };
        console.log(state, "etetetet");
        dispatch(addAttedence(newAttedence));
        setState((prev) => ({
          ...prev,
          openModel: false,
          error: true,
          selectedReason: 0,
          diableAttedence: true,
        }));
      }
    } catch (error) {}
  };

  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No events available</Text>
      </View>
    );
  };
  const onAddAttedence = async (formData) => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        const newEvent = {
          eventName: formData.eventName,
          participants: participants,
          startDate: startDate,
          endDate: endDate,
          allDay: isAllDay,
          location: "",
          repeat: "",
          token: value,
          startTime: startTime,
          endTime: endTime,
        };

        dispatch(addEventAction(newEvent));
        // dispatch(getUserDetailsAction(userId));
        navigation.navigate("UserDashBoard");
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        selected={new Date()}
        // hideKnob={true}
        showOnlySelectedDayItems={true}
        theme={{
          arrowColor: "orange",
          monthTextColor: "black",
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
          dayTextColor: "black",
          textDayFontSize: 16,
          agendaKnobColor: "#eebf80",
        }}
        renderEmptyData={renderEmptyData}
        // markedDates={events[marked]}
        items={events}
        renderItem={(item, isFirst) => {
          console.log(item);
          return (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                flex: 1,
                borderRadius: 5,
                padding: 10,
                marginRight: 10,
                marginTop: 17,
              }}
            >
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    color: "black",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {item.startTime} - {item.endTime}
                </Text>
                <Text style={styles.itemText}>{item.eventName}</Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {route.params.userRole === "participant" && (
                  <FontAwsom5
                    onPress={() => onHandleClick(item)}
                    size={23}
                    color={item.isLog ? "red" : "grey"}
                    name="fingerprint"
                    disabled={!item.isLog}
                  />
                )}
              </View>
            </View>
          );
        }}
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
                  //   alignItems: "center",
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
