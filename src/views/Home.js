import React, { useState, useEffect } from "react";
import axios from "axios";
import TableBody from "../components/TableBody";
import {
  Table as DataTable,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import ModalComponent from "../components/Modal";
import ReactExport from "react-export-excel";

export default function Posts() {
  const [APIData, setAPIData] = useState(
    JSON.parse(localStorage.getItem("data"))
  );
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const handleOpen = (data) => {
    setOpen(true);
    setModalData(data);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const prevClientTime = localStorage.getItem("time");
    const nextDayDate = new Date(JSON.parse(prevClientTime));
    nextDayDate.setHours(24, 0, 0, 0);

    if (!prevClientTime || Date.now() >= nextDayDate.getTime()) {
      axios.get(process.env.REACT_APP_ENDPOINT).then((response) => {
        setAPIData(response.data);
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(response.data));
        localStorage.setItem("time", Date.now());
      });
    }
  });

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue) {
      const filteredData = APIData.map((items) => ({
        ZIP: items.ZIP,
        NAME: items.NAME,
        A1_NAME: items.A1_NAME,
        A2_NAME: items.A2_NAME,
        A3_NAME: items.A3_NAME,
        A4_NAME: items.A4_NAME,
        A5_NAME: items.A5_NAME,
        A6_NAME: items.A6_NAME,
        A7_NAME: items.A7_NAME,
        A0_NAME: items.A0_NAME,
      })).filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <ModalComponent open={open} handleClose={handleClose} data={modalData} />
      <TextField
        id="outlined-basic"
        label="Type details to filter.."
        variant="outlined"
        size="small"
        onChange={(e) => searchItems(e.target.value)}
      />
      <div
        style={{
          marginLeft: "1rem",
          display: "inline-block",
        }}
      >
        <ExcelFile
          filename="Omniva"
          element={
            <Button variant="contained" size="small">
              Download Excel
            </Button>
          }
        >
          <ExcelSheet
            data={searchInput.length > 0 ? filteredResults : APIData}
            name="Pastomatai"
          >
            <ExcelColumn label="Zip" value="ZIP" />
            <ExcelColumn label="Name" value="NAME" />
            <ExcelColumn label="Country" value="A0_NAME" />
            <ExcelColumn label="County" value="A1_NAME" />
            <ExcelColumn label="Municipality" value="A2_NAME" />
            <ExcelColumn label="City" value="A3_NAME" />
            <ExcelColumn label="Street" value="A5_NAME" />
            <ExcelColumn label="Company" value="A6_NAME" />
            <ExcelColumn label="Number" value="A7_NAME" />
          </ExcelSheet>
        </ExcelFile>
      </div>

      <TableContainer component={Paper}>
        <DataTable>
          <TableHead>
            <TableRow>
              <TableCell>ZIP</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {searchInput.length > 0
            ? filteredResults.map((item) => {
                return (
                  <TableBody
                    data={item}
                    key={item.ZIP}
                    alldata={APIData}
                    handleOpen={handleOpen}
                  />
                );
              })
            : APIData.map((item) => {
                return (
                  <TableBody
                    data={item}
                    key={item.ZIP}
                    alldata={APIData}
                    handleOpen={handleOpen}
                  />
                );
              })}
        </DataTable>
      </TableContainer>
    </div>
  );
}
