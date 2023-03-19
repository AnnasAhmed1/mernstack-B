import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModalMUI from "./modal_mui";

export default function CardMui({ imageAddress, title, price, id }) {
  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardMedia
        component="img"
        height="400"
        image={imageAddress}
        alt="product image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          PKR {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {id}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <ModalMUI name={"EDIT"} id={id} />
        </Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
