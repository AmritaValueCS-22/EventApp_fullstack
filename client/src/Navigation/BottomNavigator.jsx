import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import UserDashBoard from "../Screens/UserDashBoard";
import AddEvent from "../Screens/AddEvent";
import { HeaderLeft, HeaderRight } from "../Components/headerLeft";

import AttedenceScreen from "../Screens/AttedenceScreen";
import { useSelector } from "react-redux";
import Event from "../Screens/Event";

const Tab = createBottomTabNavigator();

export default function BottomNavigator({ set, role }) {
  const { userDetails, attedence } = useSelector((state) => state.eventAuth);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: "green",
        tabBarBackground: "white",
      }}
      initialRouteName="AddDashboard"
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          style={{
            borderColor: "red",
            elevation: 15,
            backgroundColor: "white",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
          inactiveColor="black"
          activeColor="#eebf80"
          theme={{ colors: { secondaryContainer: "#eebf80" } }}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="UserDashBoard"
        children={() => <Event userDetails={userDetails} />}
        options={{
          tabBarLabel: "DashBorad",
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name="view-dashboard-variant"
                size={size}
                color={"#00000090"}
              />
            );
          },
          headerLeft: () => <HeaderLeft type={"dashboard"} />,
          //   headerTitle: () => <Header color={"#eebf80"} name={"back"} />,
          headerRight: () => (
            <HeaderRight set={set} type={"dashboard"} role={role} />
          ),
          headerLeftContainerStyle: {
            backgroundColor: "#eebf80",
            width: 50,
            height: 80,
          },
          headerStyle: {
            backgroundColor: "#eebf80",
            height: 80,
            borderBottomRightRadius: 50,
          },
          headerBackgroundContainerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitle: "Dashboard",
        }}
      />
      {role === "organizer" && (
        <Tab.Screen
          name="AddEvent"
          component={AddEvent}
          options={{
            tabBarLabel: "Add Event",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialIcons name="add" size={size} color={"#00000090"} />
              );
            },
            headerLeft: () => <HeaderLeft type={"add"} />,
            //   headerTitle: () => <Header color={"#eebf80"} name={"back"} />,
            headerRight: () => (
              <HeaderRight set={set} type={"dashboard"} role={role} />
            ),
            headerTitle: "Add Event",
            headerLeftContainerStyle: {
              backgroundColor: "#eebf80",
              width: 50,
              height: 80,
            },
            headerStyle: {
              backgroundColor: "#eebf80",
              height: 80,
              borderBottomRightRadius: 50,
            },
            headerBackgroundContainerStyle: {
              backgroundColor: "whitesmoke",
            },
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
      )}

      <Tab.Screen
        name="Settings"
        children={({ route }) => (
          <AttedenceScreen attedence={attedence} userRole={"organizer"} />
        )}
        options={{
          tabBarActiveBackgroundColor: " #eebf80",
          tabBarIconStyle: "white",

          tabBarLabel: "Attedence",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome5 name="file-excel" size={size} color={"#00000090"} />
            );
          },

          tabBarLabelStyle: {
            backgroudColor: "red",
          },

          headerLeft: () => <HeaderLeft type={"file-excel"} />,
          //   headerTitle: () => <Header color={"#eebf80"} name={"back"} />,
          headerRight: () => (
            <HeaderRight set={set} type={"dashboard"} role={role} />
          ),
          headerLeftContainerStyle: {
            backgroundColor: "#eebf80",
            width: 50,
            height: 80,
          },
          headerStyle: {
            backgroundColor: "#eebf80",
            height: 80,
            borderBottomRightRadius: 50,
          },
          headerBackgroundContainerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitle: "Attendence",
        }}
      />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
