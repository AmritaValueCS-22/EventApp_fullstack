import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Excel from "../Components/Excel";
import { useRoute } from "@react-navigation/native";
import TableComponent from "../Components/TableComponent";
import moment from "moment";
import EmptyScreen from "./EmptyScreen";

const AttedenceScreen = ({ attedence, userRole }) => {
  const transformedData =
    attedence.length > 0 &&
    attedence.map((item, index) => ({
      No: index + 1,
      Name: item.name,
      "E.Name": item.eventName,
      StartDate: moment(item.startDate).format("YYYY-MM-DD"),
      Attendence: item.attedence,
      Reason: item.reason || "-",
      Mobile: item.phoneNumber,
      "Parent Name": item.parentName,
    }));
  const tableData =
    attedence.length > 0 &&
    attedence.map((item, index) => ({
      No: index + 1,
      Name: item.name,
      "E.Name": item.eventName,
      StartDate: moment(item.startDate).format("YYYY-MM-DD"),
      Reason: item.reason || "-",
      Attendence: item.attedence ? "Yes" : "No",
    }));
  return (
    <View style={{ position: "relative", flex: 1 }}>
      {attedence.length > 0 ? (
        <>
          {userRole === "organizer" && <Excel attendence={transformedData} />}
          <TableComponent attendence={tableData} />
        </>
      ) : (
        <EmptyScreen title={"No attendence available "} />
      )}
    </View>
  );
};

export default AttedenceScreen;

const styles = StyleSheet.create({});
