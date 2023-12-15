import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Excel from "../Components/Excel";
import { useRoute } from "@react-navigation/native";
import TableComponent from "../Components/TableComponent";

const AttedenceScreen = ({ attedence, userRole }) => {
  const route = useRoute();

  const transformedData = attedence.map((item, index) => ({
    No: index + 1,
    Name: item.eventName,
    StartDate: item.startDate,
    EndDate: item.endDate,
    Attendence: item.attedence ? "Yes" : "No",
    Reason: item.reason || "-",
  }));
  return (
    <View style={{ position: "relative", flex: 1 }}>
      {userRole === "organizer" && <Excel attendence={transformedData} />}
      <TableComponent attendence={transformedData} />
    </View>
  );
};

export default AttedenceScreen;

const styles = StyleSheet.create({});
