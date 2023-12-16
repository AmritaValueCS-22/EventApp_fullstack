import React, { useState } from "react";
import { Button, View, Alert, Pressable, Text } from "react-native";
import { writeFile, DownloadDirectoryPath } from "react-native-fs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Toast from "react-native-toast-message";
import XLSX from "xlsx";

const Excel = ({ attendence }) => {
  const exportFile = () => {
    const DDP = DownloadDirectoryPath + "/";
    const timestamp = Date.now(); // Get current timestamp

    const output = (str) => str;

    const headers = [
      "No",
      "Name",
      "E.Name",
      "StartDate",
      "Attendence",
      "Reason",
      "Mobile",
    ];
    const ws = XLSX.utils.json_to_sheet(attendence, { header: headers });

    // Set green background color for the header row
    for (let col = 0; col < headers.length; col++) {
      const headerCell = XLSX.utils.encode_cell({ r: 0, c: col });
      ws[headerCell].s = { bold: true, fill: { fgColor: { rgb: "00FF00" } } };
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Sheet_${timestamp}`);
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const file = DDP + `attendance_${timestamp}.xlsx`; // Use timestamp in the file name

    writeFile(file, output(wbout), "ascii")
      .then((res) => {
        Toast.show({
          type: "SuccessToast",
          text1: "Exported Successfully",
        });
      })
      .catch((err) => {
        Toast.show({
          type: "ErrorToast",
          text1: "Export failed",
        });
        Alert.alert("Export failed", err.message);
      });
  };

  return (
    <View>
      <Pressable onPress={exportFile}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: "white",
            marginHorizontal: 20,
            marginVertical: 10,
            elevation: 20,
            shadowColor: "#eebf80",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#eebf80",
            borderWidth: 0.5,
            borderRadius: 10,
            flexDirection: "row",
            position: "absolute",
            right: 10,
          }}
        >
          <MaterialCommunityIcons color={"#eebf80"} size={20} name="download" />
        </View>
      </Pressable>
    </View>
  );
};

export default Excel;
