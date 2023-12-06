import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Video from "react-native-video";
import { bgImage, bgVideo } from "../constant/images";
import { Input } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import {
  signupAction,
  updateUserProfileList,
} from "../Redux/slices/EventAuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton, Switch } from "react-native-paper";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const initialState = () => {
  return {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRole: "participant",
    phoneNumber: "",
    isContinued: true,
  };
};

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email()
    .matches(/@(gmail\.com|am\.amrita\.edu)$/, {
      message: 'Email must end with either "gmail.com" or "am.amrita.edu".',
    })
    .required("invalid maill"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),

  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const SignUpScreen = () => {
  const { height, width } = Dimensions.get("screen");
  const [state, setState] = useState(initialState());
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });
  const {
    isContinued,
    username,
    email,
    password,
    confirmPassword,
    userRole,
    phoneNumber,
  } = state;
  const dispatch = useDispatch();
  const { userProfileList } = useSelector((state) => state.eventAuth);
  const navigation = useNavigation();
  const onHandleSelectProfile = () => {
    navigation.navigate("Login");
    dispatch(
      updateUserProfileList([
        ...userProfileList,
        {
          id: 1,
        },
      ])
    );
  };
  onHandleChangeSwitch = (value) => {
    setState((prev) => ({
      ...prev,
    }));
  };
  onChangeText = (text, name) => {
    setState((prev) => ({
      ...prev,
      [name]: text,
    }));
  };
  // else {
  //   const newUser = {
  //     username,
  //     email,
  //     password,
  //     confirmPassword,
  //     userRole,
  //     phoneNumber,
  //   };

  //   dispatch(signupAction(newUser));
  // }
  const onHandleContinue = () => {
    setState((prev) => ({
      ...prev,
      isContinued: true,
    }));
  };
  const onHandleSignup = async (formData) => {
    try {
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userRole,
        phoneNumber: formData.phoneNumber,
      };
      await dispatch(signupAction(newUser));
      await navigation.navigate("Login");
    } catch (error) {}
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#6DA71D",
        position: "relative",
      }}
    >
      <ImageBackground source={bgImage} style={{ width, height: 300 }}>
        <View style={{ position: "absolute", top: 0, left: 0, padding: 15 }}>
          <AntDesign
            style={{ fontSize: 30, fontWeight: 800 }}
            name="back"
            color={"white"}
            onPress={() => navigation.navigate("Welcome")}
          />
        </View>
      </ImageBackground>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width,
          height: isContinued ? 650 : 460,
          backgroundColor: "white",
          alignItems: "center",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        {isContinued ? (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={"account-edit"}
                size={25}
                color={"#eebf80"}
                style={{ marginTop: 16 }}
              />
              <Text
                style={{
                  color: "black",
                  fontSize: 25,
                  fontWeight: 800,
                  marginTop: 15,
                  marginLeft: 5,
                }}
              >
                Sign Up
              </Text>
            </View>
            <View
              style={{
                width: width - 50,
                height: "100%",
                alignItems: "center",
                paddingTop: 50,
              }}
            >
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    leftIcon={
                      <AntDesign name="user" size={20} color="#eebf80" />
                    }
                    label={"User Name"}
                    placeholder="username"
                    value={value}
                    onChangeText={onChange}
                    labelStyle={{ fontSize: 15 }}
                    errorMessage={
                      errors.username ? errors.username.message : ""
                    }
                  />
                )}
                name="username"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    leftIcon={
                      <AntDesign name="mail" size={20} color="#eebf80" />
                    }
                    label={"Mail"}
                    placeholder="abc@gmail.com"
                    value={value}
                    onChangeText={onChange}
                    style={{ fontSize: 15 }}
                    labelStyle={{ fontSize: 15 }}
                    errorMessage={errors.email ? errors.email.message : ""}
                  />
                )}
                name="email"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    leftIcon={<Icon name="mobile" size={20} color="#eebf80" />}
                    label={"mobile"}
                    placeholder="879456134"
                    value={value}
                    onChangeText={onChange}
                    style={{ fontSize: 15, marginLeft: 5 }}
                    labelStyle={{ fontSize: 15 }}
                    errorMessage={
                      errors.phonenumber ? errors.phonenumber.message : ""
                    }
                  />
                )}
                name="phoneNumber"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    leftIcon={<Icon name="lock" size={20} color="#eebf80" />}
                    label={"password"}
                    placeholder="Ainfd$875"
                    value={value}
                    onChangeText={onChange}
                    style={{ fontSize: 15, marginLeft: 5 }}
                    labelStyle={{ fontSize: 15 }}
                    errorMessage={
                      errors.password ? errors.password.message : ""
                    }
                  />
                )}
                name="password"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    leftIcon={<Icon name="lock" size={20} color="#eebf80" />}
                    label={"Confirm password"}
                    placeholder="Ainfd$875"
                    value={value}
                    onChangeText={onChange}
                    style={{ fontSize: 15, marginLeft: 5 }}
                    labelStyle={{ fontSize: 15 }}
                    errorMessage={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : ""
                    }
                  />
                )}
                name="confirmPassword"
              />
            </View>
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 50,
                  flex: 0.3,
                  marginTop: 50,
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {" "}
                I am the{" "}
              </Text>
              <Text
                style={{
                  color: "#8ce68b",
                  fontSize: 26,
                  flex: 0.3,
                  fontWeight: 800,
                  marginLeft: 60,
                  textTransform: "capitalize",
                }}
              >
                {state.userRole}.
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                flex: 0.7,
              }}
            >
              <View style={{ marginHorizontal: 15, alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: 500, color: "black" }}>
                  Organizer
                </Text>
                <RadioButton
                  value="organizer"
                  color="#8ce68b"
                  status={
                    state.userRole === "organizer" ? "checked" : "unchecked"
                  }
                  onPress={() =>
                    setState((prev) => ({
                      ...prev,
                      userRole: "organizer",
                    }))
                  }
                />
              </View>
              <View style={{ marginHorizontal: 15, alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: 500, color: "black" }}>
                  Participant
                </Text>
                <RadioButton
                  value="participant"
                  color="#8ce68b"
                  status={
                    state.userRole === "participant" ? "checked" : "unchecked"
                  }
                  onPress={() =>
                    setState((prev) => ({
                      ...prev,
                      userRole: "participant",
                    }))
                  }
                />
              </View>
            </View>
          </View>
        )}

        <Pressable
          style={{
            width,
            height: 50,
            backgroundColor: "#eebf80",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
          }}
          onPress={
            !isContinued ? onHandleContinue : handleSubmit(onHandleSignup)
          }
        >
          <Text style={{ color: "white", fontWeight: 800, fontSize: 20 }}>
            {isContinued ? "Sign Up" : "Continue"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    height: "100%",
    position: "relative",
  },
});
