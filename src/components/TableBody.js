import React from "react";
import {
  TableRow,
  TableCell,
  TableBody as DataTableBody,
  Button,
} from "@mui/material";
import { findElement } from "../utils";

function TableBody({ data, alldata, handleOpen }) {
  const {
    ZIP,
    NAME,
    A0_NAME,
    A1_NAME,
    A2_NAME,
    A3_NAME,
    A4_NAME,
    A5_NAME,
    A6_NAME,
    A7_NAME,
  } = data;

  return (
    <DataTableBody key={ZIP}>
      <TableRow>
        <TableCell>{ZIP}</TableCell>
        <TableCell>{NAME}</TableCell>
        <TableCell>
          {A1_NAME} {A2_NAME} {A3_NAME} {A4_NAME} {A5_NAME} {A6_NAME} {A7_NAME},{" "}
          {A0_NAME}
        </TableCell>
        <TableCell>
          <Button onClick={() => handleOpen(findElement(alldata, ZIP))}>
            View
          </Button>
        </TableCell>
      </TableRow>
    </DataTableBody>
  );
}
export default TableBody;
