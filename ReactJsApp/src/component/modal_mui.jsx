import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { comp_function } from "../store/componentReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalMUI({ name, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [imageAddress, setImageAddress] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [handleChange, setHandleChange] = React.useState(false);

  return (
    <div>
      <Button
        sx={{ backgroundColor: "white" }}
        size="large"
        onClick={handleOpen}
      >
        {name}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="standard-basic"
            label="Image Path"
            variant="standard"
            onChange={(e) => {
              setImageAddress(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Product Title"
            variant="standard"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="product Price"
            variant="standard"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <br />
          <Button
            onClick={() => {
              console.log("modlal action ruuniong");
              handleClose();
              dispatch(
                comp_function({
                  imageAddress,
                  title,
                  price,
                  id,
                  // refresh: true,
                })
              );
            }}
            size="small"
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
