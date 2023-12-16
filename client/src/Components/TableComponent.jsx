import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { DataTable, Text, TextInput } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";
import ReactNativeModal from "react-native-modal";
import moment from "moment";

const itemsPerPage = 10; // Set the number of items per page

const ColorfulTableWithPagination = ({ attendence }) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDate, setOpenDate] = useState(false);

  const totalPages = Math.ceil(attendence.length / itemsPerPage);

  const start = page * itemsPerPage;
  const end = (page + 1) * itemsPerPage;

  const filteredData = attendence.filter((rowData) =>
    moment(rowData?.StartDate)
      .format("YYYY-MM-DD")
      .toLowerCase()
      .includes(searchQuery?.toLowerCase())
  );

  const paginatedData = filteredData.slice(start, end);

  const handleChangePage = (selectedPage) => {
    setPage(selectedPage);
  };

  const openModel = () => {
    setOpenDate(true);
  };
  const onHandlChange = (date) => {
    const search = moment(date).format("YYYY-MM-DD");
    setSearchQuery(search);
    setPage(0);
  };

  return (
    <View style={{ marginTop: 55 }}>
      <Pressable onPress={openModel}>
        <TextInput
          label="Search StartDate"
          value={searchQuery}
          style={{ margin: 10 }}
          disabled={true}
        />
      </Pressable>

      <DataTable>
        <DataTable.Header>
          {["No", "Name", "E.Name", "StartDate", "Reason", "Attendence"].map(
            (head, index) => (
              <DataTable.Title key={index} style={{ fontWeight: "bold" }}>
                {head}
              </DataTable.Title>
            )
          )}
        </DataTable.Header>

        {paginatedData.map((rowData, index) => (
          <DataTable.Row key={index}>
            {Object.values(rowData).map((value, colIndex) => (
              <DataTable.Cell style={{ fontSize: 5 }} key={colIndex}>
                {value}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>

      <DataTable.Pagination
        page={page}
        numberOfPages={totalPages}
        onPageChange={(page) => handleChangePage(page)}
        label={`${page + 1} of ${totalPages}`}
      />
      <ReactNativeModal
        style={{ margin: 0 }}
        // backdropColor="green"
        isVisible={openDate}
        onBackdropPress={() => {
          setOpenDate(false);
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 400,
            justifyContent: "center",
            margin: 0,
          }}
        >
          <CalendarPicker
            maxDate={new Date(2050, 6, 3)}
            onDateChange={onHandlChange}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default ColorfulTableWithPagination;
