import React, { useState } from "react";
import { View } from "react-native";
import { DataTable, Text, TextInput } from "react-native-paper";

const itemsPerPage = 10; // Set the number of items per page

const ColorfulTableWithPagination = ({ attendence }) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(attendence.length / itemsPerPage);

  const start = page * itemsPerPage;
  const end = (page + 1) * itemsPerPage;

  const filteredData = attendence.filter((rowData) =>
    rowData.StartDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(start, end);

  const handleChangePage = (selectedPage) => {
    setPage(selectedPage);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0); // Reset page when the search query changes
  };

  return (
    <View style={{ marginTop: 55 }}>
      <TextInput
        label="Search StartDate"
        value={searchQuery}
        onChangeText={handleSearch}
        style={{ margin: 10 }}
      />

      <DataTable>
        <DataTable.Header>
          {["No", "Name", "StartDate", "Attendence", "Reason"].map(
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
    </View>
  );
};

export default ColorfulTableWithPagination;
