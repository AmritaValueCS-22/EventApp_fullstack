import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  bg2,
  bg3,
  createProfile,
  createProfileBg,
  user,
} from "../constant/images";
import { Avatar, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createProfileAction,
  deleteProfileAction,
  getUserDetailsAction,
  updateUserProfileList,
} from "../Redux/slices/EventAuthReducer";
import Toast from "react-native-toast-message";
import { Input } from "react-native-elements";
import EditProfileScreen from "./EditProfileScreen";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import ProfileLoader from "../Components/ProfileLoader";

const CreateProfile = () => {
  const { height, width } = Dimensions.get("screen");
  const [token, set] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const {
    userProfileList,
    loginData,
    showSplash,
    isLoading,
    userDetails,
    isProfileLoading,
    userLoading,
  } = useSelector((state) => state.eventAuth);

  const navigation = useNavigation();

  const onCreateProfile = () => {
    if (userDetails.user.profile.length > 3) {
      Toast.show({
        type: "WarningToast",
        text1: "Only four profiles per account",
      });
      return;
    }
    const newProfile = {
      id: String(userDetails.user.profile.length + 1),
      token,
    };

    dispatch(createProfileAction(newProfile));
  };
  const onHandleRemove = async (id) => {
    const userId = await AsyncStorage.getItem("userId");

    const deleteProfile = {
      id,
      userId: userId,
    };

    dispatch(deleteProfileAction(deleteProfile));
  };
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");

      if (value !== null) {
        set(value);
      }

      if (value !== null) {
        set(value);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };
  const onEditProfile = (id) => {
    navigation.navigate("EditProfile", {
      id,
    });
  };
  const userDetailsFun = async () => {
    const userId = await AsyncStorage.getItem("userId");
    dispatch(getUserDetailsAction(userId));
  };
  const userDetailsFun2 = async () => {
    const userId = await AsyncStorage.getItem("userId");
    dispatch(getUserDetailsAction(userId));
    readData();
  };
  useEffect(() => {
    userDetailsFun();
  }, [isProfileLoading]);
  useEffect(() => {
    navigation.addListener("focus", () => {
      userDetailsFun2();
    });
  }, [navigation]);

  const onHanldeOpneProfile = async (name, id, parentName) => {
    if (name !== undefined) {
      await AsyncStorage.setItem(
        "userName",
        name === undefined ? "user" : name
      );
      await AsyncStorage.setItem("profileId", id === undefined ? 0 : id);
      await AsyncStorage.setItem(
        "parentName",
        parentName === undefined ? "" : parentName
      );
      navigation.navigate("BottomNavigator");
    } else {
      Toast.show({
        type: "WarningToast",
        text1: "Profile Name is Require",
      });
    }
  };
  return (
    <View>
      <View
        source={createProfileBg}
        style={{
          width,
          height,

          backgroundColor: "#1188E4",
        }}
      >
        <ImageBackground
          source={bg3}
          style={{
            width,
            flex: 1,
            position: "relative",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              alignItems: "center",
              width,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              elevation: 93,
              shadowColor: "red",
              justifyContent: "space-between",
              backgroundColor: "white",
              flex: 0.6,
            }}
          >
            <>
              <View style={{ flex: 0.4, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "black",
                    marginVertical: 20,
                  }}
                >
                  How many{"   "}
                  <Text
                    style={{
                      color: "black",
                      fontSize: 25,
                      fontWeight: 800,
                    }}
                  >
                    Profiles ?
                  </Text>
                </Text>
                <View
                  style={{
                    height: "100%",
                    width: 300,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    marginTop: 10,
                  }}
                >
                  {userLoading && <ProfileLoader />}
                  {!userLoading &&
                    userDetails?.user?.profile?.map((item, index) => {
                      return (
                        <Pressable style={{ position: "relative" }} key={index}>
                          <View
                            style={{
                              marginHorizontal: 20,
                              marginVertical: 10,
                              alignItems: "center",
                            }}
                          >
                            <Pressable
                              onPress={() =>
                                onHanldeOpneProfile(
                                  item.name,
                                  item.id,
                                  item.parentName
                                )
                              }
                            >
                              <Avatar.Image
                                style={{ elevation: 10, shadowColor: "green" }}
                                size={70}
                                source={user}
                              />
                            </Pressable>
                            <Text
                              style={{
                                color: "grey",
                                fontWeight: 700,
                                textTransform: "capitalize",
                                marginVertical: 6,
                                color: "#A25C02",
                              }}
                            >
                              {item.name === undefined ? "user" : item.name}
                            </Text>
                          </View>
                          <Ionicons
                            onPress={() => onHandleRemove(item.id)}
                            name="close"
                            size={20}
                            color={"black"}
                            style={{ position: "absolute", right: 0 }}
                          />
                          <AntDesign
                            onPress={() => onEditProfile(index + 1)}
                            name="edit"
                            size={20}
                            color={"black"}
                            style={{ position: "absolute", right: 1, top: 55 }}
                          />
                        </Pressable>
                      );
                    })}
                </View>
              </View>
              <View
                style={{
                  flex: 0.3,
                  height: 60,

                  alignItems: "center",
                }}
              >
                <Pressable
                  style={{
                    width: width - 50,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#eebf80",
                    paddingBottom: 5,
                    borderRadius: 40,
                  }}
                  onPress={onCreateProfile}
                >
                  <Ionicons
                    style={{ marginHorizontal: 5, paddingTop: 10 }}
                    color={"white"}
                    name="person-add"
                    size={20}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: 800,
                      fontSize: 15,
                      paddingTop: 10,
                    }}
                  >
                    Add Profile
                  </Text>
                </Pressable>
              </View>
            </>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({});
