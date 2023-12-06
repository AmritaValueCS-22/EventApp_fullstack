import { View, Text } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { CommonColor } from "../constant/colors";
import LottieView from "lottie-react-native";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      text1Style={{
        fontSize: 20,
      }}
      text2Style={{
        fontSize: 10,
      }}
    />
  ),

  WarningToast: ({ text1, props }) => (
    <View
      style={{
        height: 80,
        width: "95%",
        backgroundColor: "white",
        paddingHorizontal: 35,
        borderRadius: 30,
        marginHorizontal: 5,
        elevation: 20,
        shadowColor: "#f1b552",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            color: CommonColor.primary,
            fontSize: 13,
            fontWeight: "600",
          }}
        >
          {text1}
        </Text>
        <LottieView
          source={require("../Assets/json/check.json")}
          autoPlay
          loop
          style={{ width: "15%", marginLeft: 10 }}
        />
      </View>
    </View>
  ),
  SuccessToast: ({ text1, props }) => (
    <View
      style={{
        height: 70,
        width: "90%",
        backgroundColor: "white",
        paddingHorizontal: 25,
        borderRadius: 30,
        marginHorizontal: 5,
        elevation: 20,
        shadowColor: "#03bfa5",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            color: "green",
            fontSize: 13,
            fontWeight: "600",
          }}
        >
          {text1}
        </Text>
        <LottieView
          source={require("../Assets/json/check.json")}
          autoPlay
          loop
          style={{ width: "30%" }}
        />
      </View>
    </View>
  ),
  ErrorToast: ({ text1, props }) => (
    <View
      style={{
        height: 70,
        width: "90%",
        backgroundColor: "white",
        paddingHorizontal: 25,
        borderRadius: 30,
        marginHorizontal: 5,
        elevation: 20,
        shadowColor: "#db414c",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            color: CommonColor.primary,
            fontSize: 11,
            fontWeight: "600",
            width: 270,
          }}
        >
          {text1}
        </Text>
        <LottieView
          source={require("../Assets/json/error.json")}
          autoPlay
          loop
          style={{ width: "15%" }}
        />
      </View>
    </View>
  ),
};
