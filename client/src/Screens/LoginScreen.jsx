import {
  Dimensions,
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
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { useDispatch } from "react-redux";
import { loginAction, updateSplash } from "../Redux/slices/EventAuthReducer";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const initialState = () => {
  return {};
};
const schema = yup.object().shape({
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
});

const LoginScreen = () => {
  const { height, width } = Dimensions.get("screen");
  const [state, setState] = useState(initialState());

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onHanldeCreateProfile = (formData) => {
    const loginUser = { email: formData.email, password: formData.password };
    // navigation.navigate("CreateProfile");
    dispatch(loginAction(loginUser));
  };
  onChangeText = (text, name) => {
    setState((prev) => ({
      ...prev,
      [name]: text,
    }));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#6DA71D",
        alignItems: "center",
        position: "relative",
      }}
    >
      <ImageBackground source={bgImage} style={{ width, height: 400 }}>
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
          height: 450,
          backgroundColor: "white",
          alignItems: "center",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name={"login"}
              size={25}
              color={"#eebf80"}
            />
            <Text
              style={{
                color: "black",
                fontSize: 25,
                fontWeight: 800,
                marginVertical: 15,
                marginLeft: 5,
              }}
            >
              Login
            </Text>
          </View>

          <View
            style={{ width: width - 50, height: "100%", alignItems: "center" }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  leftIcon={<AntDesign name="mail" size={20} color="#eebf80" />}
                  label={"Mail"}
                  placeholder="abc@gmail.com"
                  style={{ fontSize: 15 }}
                  value={value}
                  labelStyle={{ fontSize: 15 }}
                  onChangeText={onChange}
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
                  leftIcon={<Icon name="lock" size={20} color="#eebf80" />}
                  label={"password"}
                  placeholder="Ainfd$875"
                  style={{ fontSize: 15 }}
                  labelStyle={{ fontSize: 15 }}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password ? errors.password.message : ""}
                />
              )}
              name="password"
            />
          </View>
        </View>
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
          onPress={handleSubmit(onHanldeCreateProfile)}
        >
          <Text style={{ color: "white", fontWeight: 800, fontSize: 20 }}>
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    height: "100%",
    position: "relative",
  },
});
