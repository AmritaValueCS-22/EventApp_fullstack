import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Agenda } from "react-native-calendars";
import AsyncStorage from "@react-native-community/async-storage";

import { useSelector } from "react-redux";
import FontAwsom5 from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import EmptyScreen from "../Screens/EmptyScreen";
import moment from "moment";

const Calender = ({ onHandleClick, role, logged, showmodel }) => {
  const { eventDetails } = useSelector((state) => state.eventAuth);
  console.log(eventDetails, "eventDetails");

  const renderEmptyData = () => {
    return <EmptyScreen title="No Events available " />;
  };
  return (
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
      items={eventDetails}
      renderItem={(item, isFirst) => {
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
                {item?.startTime} - {item?.endTime}
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
              {role !== "organizer" && (
                <FontAwsom5
                  onPress={() => onHandleClick(item)}
                  size={23}
                  color={
                    moment(item.StartDate)
                      .format("YYYY-MM-DD")
                      .toLowerCase() ===
                    moment().format("YYYY-MM-DD").toLowerCase()
                      ? "grey"
                      : "red"
                  }
                  name="checkbox-marked-circle-outline"
                  disabled={
                    item.isLog &&
                    moment(item.startTime).format("YYYY-MM-DD") ===
                      moment().format("YYYY-MM-DD")
                  }
                />
              )}
              {role === "organizer" && (
                <FontAwsom5
                  onPress={() => showmodel(item)}
                  size={23}
                  color={"green"}
                  name="circle-edit-outline"
                />
              )}
            </View>
          </View>
        );
      }}
    />
  );
};

export default Calender;

const styles = StyleSheet.create({});
