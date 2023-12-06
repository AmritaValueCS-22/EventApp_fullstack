import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TimePicker from "@react-native-community/datetimepicker";

import { Calendar } from "react-native-calendars";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Input, Slider, Switch } from "react-native-elements";
import { TextInput } from "react-native-paper";
import Swiper from "react-native-deck-swiper";
import { profileData } from "../data/profileData";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import {
  AddProfileAction,
  editProfileAction,
  updateUserData,
  updateUserProfileList,
} from "../Redux/slices/EventAuthReducer";
import Toast from "react-native-toast-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

const initialState = () => {
  return {
    name: "",
    grade: "",
    age: "",
    gender: "",
    "Date Of Birth": "",
    nationality: "",
    buildingName: "",
    roomNumber: "",
    "Parent/Gurdian Name": "",
    "Parent/Gurdian Number": "",
    Relationship: "",
    isOpen: false,
    value: 1,
  };
};

const EditProfileScreen = () => {
  const [state, setState] = useState(initialState());
  const { UserData, userProfileList, loginData, userDetails } = useSelector(
    (state) => state.eventAuth
  );

  const useSwiper = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { value } = state;
  const { height, width } = Dimensions.get("screen");
  const onHandleChange = (text, name) => {
    setState((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  const interpolate = (start, end) => {
    let k = (value - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };
  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 205);
    let b = interpolate(250, 255);
    return `rgb(${r},${g},${b})`;
  };
  const onSwiped = (type) => {};
  const onClickBack = () => {
    useSwiper.current.swipeBack();
    setState((prev) => ({
      ...prev,
      value: prev.value - 1,
    }));
  };
  const onClickNext = () => {
    useSwiper.current.swipeRight();
    setState((prev) => ({
      ...prev,
      value: prev.value + 1,
    }));
  };

  const OnSubmit = async () => {
    if (state.name !== "") {
      const userId = await AsyncStorage.getItem("userId");
      const newData = {
        id: String(route.params.id),
        name: state.name,
        age: state.age,
        grade: state.grade,
        DOB: state["Date Of Birth"],
        gender: state.gender,
        nationality: state.nationality,
        buildingName: state.buildingName,
        roomNumber: state.roomNumber,
        // emergencyContact: {
        //   name: state["Parent/Gurdian Name"],
        //   number: state["Parent/Gurdian Number"],
        //   relationShip: state.Relationship,
        // },
        userId: userId,
      };
      console.log(newData);
      dispatch(editProfileAction(newData));

      navigation.navigate("CreateProfile");
    } else {
      Toast.show({
        type: "WarningToast",
        text1: "Name is Rquired",
      });
    }

    // navigation.navigate("UserDashBoard");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: "white",
        paddingBottom: 5,
      }}
    >
      <View
        style={{
          flex: 0.8,
          alignItems: "center",
        }}
      >
        <View style={{ marginVertical: 10 }}>
          <TextInput
            mode="outlined"
            outlineStyle={{
              backgroundColor: "white",
              borderColor: "#eac084",
              fontWeight: "800",
              borderRadius: 8,
            }}
            onChangeText={(text) => onHandleChange(text, "name")}
            placeholder="Name"
            placeholderTextColor={"#eac084"}
            style={{
              width: width - 80,
              backgroundColor: "whitesmoke",
              fontSize: 14,
              height: 35,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <SelectDropdown
            data={[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
            ]}
            onSelect={(selectedItem, index) => {
              setState((prev) => ({
                ...prev,
                class: selectedItem,
              }));
            }}
            defaultButtonText={"Select Class"}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#eac084"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <SelectDropdown
            data={["A", "B", "C", "D", "E", "F", "G"]}
            onSelect={(selectedItem, index) => {
              setState((prev) => ({
                ...prev,
                grade: selectedItem,
              }));
            }}
            defaultButtonText={"Select Section"}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#eac084"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <SelectDropdown
            data={["Male", "Female"]}
            defaultButtonText={"Gender"}
            onSelect={(selectedItem, index) => {
              setState((prev) => ({
                ...prev,
                gender: selectedItem,
              }));
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#eac084"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <SelectDropdown
            data={[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
            ]}
            onSelect={(selectedItem, index) => {
              setState((prev) => ({
                ...prev,
                age: selectedItem,
              }));
            }}
            defaultButtonText={"Age"}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#eac084"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Pressable
            onPress={() => {
              setState((prev) => ({
                ...prev,
                isOpen: true,
              }));
            }}
          >
            <TextInput
              mode="outlined"
              outlineStyle={{
                backgroundColor: "white",
                borderColor: "#eac084",
                fontWeight: "800",
                borderRadius: 8,
              }}
              placeholder="Date Of Birth"
              style={{ width: width - 80, fontSize: 14, height: 35 }}
              disabled={true}
              value={state["Date Of Birth"]}
              placeholderTextColor={"#eac084"}
            />
          </Pressable>
          {state.isOpen && (
            <TimePicker
              value={new Date()}
              mode={"date"}
              is24Hour={true}
              display=""
              onChange={(date) => {
                setState((prev) => ({
                  ...prev,
                  "Date Of Birth": moment(date.nativeEvent.timestamp).format(
                    "YYYY-MM-DD"
                  ),
                  isOpen: false,
                }));
              }}
            />
          )}
        </View>

        <View style={{ marginVertical: 10 }}>
          <SelectDropdown
            data={[
              "India",
              "Egypt",
              "Canada",
              "Australia",
              "Ireland",
              "Brazil",
              "England",
              "Dubai",
              "France",
              "Germany",
              "Saudi Arabia",
              "Argentina",
            ]}
            onSelect={(selectedItem, index) => {
              setState((prev) => ({
                ...prev,
                nationality: selectedItem,
              }));
            }}
            defaultButtonText={"Nationality"}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#eac084"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <TextInput
            onChangeText={(text) => onHandleChange(text, "buildingName")}
            placeholder="BuildingName"
            mode="outlined"
            outlineStyle={{
              backgroundColor: "white",
              borderColor: "#eac084",
              fontWeight: "800",
              borderRadius: 8,
            }}
            style={{
              width: width - 80,
              backgroundColor: "whitesmoke",
              fontSize: 14,
              height: 35,
            }}
            placeholderTextColor={"#eac084"}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <TextInput
            onChangeText={(text) => onHandleChange(text, "roomNumber")}
            placeholder="RoomNumber"
            mode="outlined"
            outlineStyle={{
              backgroundColor: "white",
              borderColor: "#eac084",
              fontWeight: "800",
              borderRadius: 8,
            }}
            style={{
              width: width - 80,
              backgroundColor: "whitesmoke",
              fontSize: 14,
              height: 35,
            }}
            placeholderTextColor={"#eac084"}
          />
        </View>
        <View
          style={{
            height: 60,
            marginVertical: 30,
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              width: width - 70,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#eebf80",
              paddingBottom: 5,
              borderRadius: 40,
            }}
            onPress={OnSubmit}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 800,
                fontSize: 15,
                paddingTop: 10,
              }}
            >
              Update Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: "row",

    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  headerTitle: { color: "#000", fontWeight: "bold", fontSize: 16 },
  saveAreaViewContainer: { flex: 1, backgroundColor: "#eac084" },

  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "10%",
    paddingBottom: "20%",
  },

  dropdown1BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#eac084",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    // backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },

  dropdown2BtnStyle: {
    width: "80%",
    height: 35,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#eac084",
    borderWidth: 1,
  },
  dropdown2BtnTxtStyle: {
    color: "#eac084",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 15,
  },
  dropdown2DropdownStyle: {
    backgroundColor: "#444",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
  dropdown2RowTxtStyle: {
    color: "#eac084",
    textAlign: "center",
    fontWeight: "bold",
  },

  dropdown3BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#eac084",
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#444",
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: { width: 45, height: 45, resizeMode: "cover" },
  dropdown3BtnTxt: {
    color: "#444",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: { backgroundColor: "slategray" },
  dropdown3RowStyle: {
    backgroundColor: "slategray",
    borderBottomColor: "#444",
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  dropdownRowImage: { width: 45, height: 45, resizeMode: "cover" },
  dropdown3RowTxt: {
    color: "#F1F1F1",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: "50%",
    height: 50,
    backgroundColor: "#eac084",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown4BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown4DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown4RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown4RowTxtStyle: { color: "#444", textAlign: "left" },
});
