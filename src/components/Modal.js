import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent({ open, handleClose, data }) {
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
    TYPE,
    X_COORDINATE,
    Y_COORDINATE,
    MODIFIED,
    comment_est,
    comment_eng,
    comment_rus,
    comment_lav,
    comment_lit,
  } = data;
  let date = new Date(MODIFIED);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Name: {NAME}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ZIP:{ZIP}
          <br />
          Type:{TYPE}
          <br />
          Adress:{" "}
          {A0_NAME +
            " " +
            A1_NAME +
            " " +
            A2_NAME +
            " " +
            A3_NAME +
            " " +
            A4_NAME +
            " " +
            A5_NAME +
            " " +
            A6_NAME +
            " " +
            A7_NAME}{" "}
          <br />
          X-Coordinate: {X_COORDINATE + " "} <br />
          Y-Coordinate: {Y_COORDINATE} <br />
          Last modified: {date.toLocaleString("en-US")} <br />
          {comment_est} {comment_eng} {comment_rus} {comment_lav} {comment_lit}
        </Typography>
      </Box>
    </Modal>
  );
}
