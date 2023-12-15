import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Switch, TextInput } from "react-native-paper";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";
import ReactNativeModal from "react-native-modal";
import TimePicker from "@react-native-community/datetimepicker";
import {
  addEventAction,
  getUserDetailsAction,
  updateEvents,
} from "../Redux/slices/EventAuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-community/async-storage";

let StartDate = new Date().toJSON().slice(0, 10);
let EndDate = new Date().toJSON().slice(0, 10);
let starttime = new Date().getTime();
const initialState = () => {
  return {
    startDate: StartDate,
    endDate: EndDate,
    startTime: moment().add(30, "minute").format("HH:mm"),
    endTime: moment().add(60, "minute").format("HH:mm"),
    openStartDate: false,
    openEndDate: false,
    openStartTime: false,
    openEndTime: false,
    participants: [],
    isAllDay: true,
    users: [],
  };
};
const schema = yup.object().shape({
  eventName: yup.string().required("Field is required"),
});

const AddEvent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      eventName: "",
    },
  });
  const { height, width } = Dimensions.get("screen");
  const [state, set] = useState(initialState());
  const { profileNames } = useSelector((state) => state.eventAuth);
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  console.log(route, "rr");
  const {
    startDate,
    endDate,
    startTime,
    endTime,
    openStartDate,
    isAllDay,
    participants,
    openEndDate,
    openEndTime,
    openStartTime,
  } = state;

  useEffect(() => {
    navigation.addListener("focus", () => {
      set((prev) => ({
        ...prev,
        participants: profileNames,
      }));
    });
  }, [profileNames, navigation]);
  const onClear = () => {
    set((prev) => ({
      ...prev,
      startDate: StartDate,
      endDate: EndDate,
      startTime: moment().add(30, "minute").format("HH:mm"),
      endTime: moment().add(60, "minute").format("HH:mm"),
      openStartDate: false,
      openEndDate: false,
      openStartTime: false,
      openEndTime: false,
      participants: [],
      isAllDay: true,
      users: [],
      eventName: "",
    }));
  };
  const onChangeSwitch = (value) => {
    set((prev) => ({
      ...prev,
      isAllDay: !isAllDay,
    }));
  };
  const onChangeText = (text, type) => {
    set((prev) => ({
      ...prev,
      [type]: text,
    }));
  };
  const onHanldeCalenderPress = (type) => {
    switch (type) {
      case "startDate":
        set((prev) => ({
          ...prev,
          openStartDate: true,
        }));
        break;
      case "endDate":
        set((prev) => ({
          ...prev,
          openEndDate: true,
        }));
        break;
      case "startTime":
        set((prev) => ({
          ...prev,
          openStartTime: true,
          openEndDate: false,
        }));
        break;
      case "endTime":
        set((prev) => ({
          ...prev,
          openEndTime: true,
        }));
        break;
      default:
        break;
    }
  };

  const onHandlChange = (date, type) => {
    switch (type) {
      case "startDate":
        set((prev) => ({
          ...prev,
          startDate: moment(date).format("YYYY-MM-DD"),
          endDate: moment(date).format("YYYY-MM-DD"),
          openStartDate: false,
        }));
        break;
      case "endDate":
        set((prev) => ({
          ...prev,
          endDate: moment(date).format("YYYY-MM-DD"),
          openEndDate: false,
        }));
        break;
      case "startTime":
        set((prev) => ({
          ...prev,
          startTime: moment(date.nativeEvent.timestamp).format("hh:mm a"),
          openStartTime: false,
        }));
        break;
      case "endTime":
        set((prev) => ({
          ...prev,
          endTime: moment(date.nativeEvent.timestamp).format("hh:mm a"),
          openEndTime: false,
        }));
        break;

      default:
        break;
    }
  };
  console.log(profileNames);

  const onHandleAddEvent = async (formData) => {
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

        await dispatch(addEventAction(newEvent));
        await navigation.navigate("UserDashBoard");
        onClear();
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };
  return (
    <View
      style={{
        flex: 1,

        alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <View
        style={{
          width: width - 30,
          padding: 5,
          // backgroundColor: "whitesmoke",
          marginTop: 80,
          height: height - 350,
          position: "relative",
          paddingTop: 20,
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            bottom: 0,
            height: 50,
            backgroundColor: "#eebf80",
            width: width - 30,
            alignItems: "center",
            justifyContent: "center",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
          onPress={handleSubmit(onHandleAddEvent)}
        >
          <Text style={{ color: "white", fontWeight: 900, fontSize: 18 }}>
            Add Event
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <FontAwesome5
            style={{ marginRight: 5 }}
            color={"#eebf80"}
            size={20}
            name="edit"
          />
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  placeholder="Event Name"
                  style={{
                    width: width - 100,
                    height: 45,
                    marginLeft: 5,
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: "600",
                  }}
                />
              )}
              name="eventName"
            />
            <Text style={{ marginLeft: 15, color: "red" }}>
              {errors.eventName ? errors.eventName.message : ""}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <FontAwesome5
            style={{ marginRight: 5 }}
            color={"#eebf80"}
            size={20}
            name="user-alt"
          />
          <TextInput
            placeholder="@allparticipents"
            style={{
              width: width - 100,
              height: 45,
              marginLeft: 5,
              backgroundColor: "white",
              fontWeight: "700",
            }}
            onChangeText={(text) => onChangeText(text, "")}
            disabled={true}
            placeholderTextColor={"#eebf80"}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Switch value={isAllDay} color="#eebf80" onChange={onChangeSwitch} />
          <Text style={{ color: "black", marginHorizontal: 5 }}>Every day</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <View style={{ flex: 0.6 }}>
            <View style={{ marginVertical: 10, flexDirection: "row" }}>
              <View style={{ flex: 0.2 }}>
                <FontAwesome5
                  style={{ marginRight: 5, marginBottom: 2 }}
                  color={"#eebf80"}
                  size={20}
                  name="calendar"
                />
                <Text style={{ color: "grey", fontWeight: 600 }}>Start</Text>
              </View>
              <View
                style={{
                  flex: 0.8,
                  justifyContent: "center",
                  marginLeft: 17,
                }}
              >
                <Pressable onPress={() => onHanldeCalenderPress("startDate")}>
                  <Text
                    style={{
                      color: "#00000080",
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {startDate}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{ marginVertical: 10, flexDirection: "row" }}>
              <View style={{ flex: 0.2 }}>
                <FontAwesome5
                  style={{ marginRight: 5, marginBottom: 2 }}
                  color={"#eebf80"}
                  size={20}
                  name="calendar"
                />
                <Text style={{ color: "grey", fontWeight: 600 }}>End</Text>
              </View>
              <View
                style={{
                  flex: 0.8,
                  justifyContent: "center",
                  marginLeft: 20,
                }}
              >
                <Pressable onPress={() => onHanldeCalenderPress("endDate")}>
                  <Text
                    style={{
                      color: "#00000080",
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {endDate}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.4 }}>
            <View style={{ marginVertical: 10, flexDirection: "row" }}>
              <View style={{ flex: 0.3 }}>
                <FontAwesome5
                  style={{ marginRight: 5, marginBottom: 2 }}
                  color={"#eebf80"}
                  size={20}
                  name="clock"
                />
                <Text style={{ color: "grey", fontWeight: 600, fontSize: 11 }}>
                  Time
                </Text>
              </View>
              <View
                style={{
                  flex: 0.8,
                  justifyContent: "center",
                  marginLeft: 20,
                }}
              >
                <Pressable onPress={() => onHanldeCalenderPress("startTime")}>
                  <Text
                    style={{
                      color: "#00000080",
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {startTime}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{ marginVertical: 10, flexDirection: "row" }}>
              <View style={{ flex: 0.3 }}>
                <FontAwesome5
                  style={{ marginRight: 5, marginBottom: 2 }}
                  color={"#eebf80"}
                  size={20}
                  name="clock"
                />
                <Text style={{ color: "grey", fontWeight: 600, fontSize: 11 }}>
                  Time
                </Text>
              </View>
              <View
                style={{
                  flex: 0.8,
                  justifyContent: "center",
                  marginLeft: 20,
                }}
              >
                <Pressable onPress={(date) => onHanldeCalenderPress("endTime")}>
                  <Text
                    style={{
                      color: "#00000080",
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {endTime}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      <ReactNativeModal
        style={{ margin: 0 }}
        // backdropColor="green"
        isVisible={openStartDate}
        onBackdropPress={() => {
          set((prev) => ({
            ...prev,
            openStartDate: false,
          }));
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: "#eebf80",
              height: 50,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 17,
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              Start Date
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              height: 400,
              justifyContent: "center",
              margin: 0,
            }}
          >
            <CalendarPicker
              minDate={new Date()}
              maxDate={new Date(2050, 6, 3)}
              onDateChange={(date) => onHandlChange(date, "startDate")}
            />
          </View>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        style={{ margin: 0 }}
        // backdropColor="green"
        isVisible={openEndDate}
        onBackdropPress={() => {
          set((prev) => ({
            ...prev,
            openEndDate: false,
          }));
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: "#eebf80",
              height: 50,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 17,
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              End Date
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              height: 400,
              justifyContent: "center",
              margin: 0,
            }}
          >
            <CalendarPicker
              minDate={new Date()}
              maxDate={new Date(2050, 6, 3)}
              onDateChange={(date) => onHandlChange(date, "endDate")}
            />
          </View>
        </View>
      </ReactNativeModal>
      {openStartTime && (
        <TimePicker
          value={new Date()}
          mode={"time"}
          is24Hour={true}
          display="clock"
          onChange={(date) => onHandlChange(date, "startTime")}
        />
      )}
      {openEndTime && (
        <TimePicker
          value={new Date()}
          mode={"time"}
          is24Hour={true}
          display="clock"
          onChange={(date) => onHandlChange(date, "endTime")}
        />
      )}
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({});
