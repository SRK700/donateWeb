import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DialogTitle from "@mui/material/DialogTitle";

function DetailById({ place }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>แสดงรายละเอียด</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {place && (
            <Card key={place.item_id} sx={{ maxWidth: 500 }}>
              <CardContent>
                <h3>{place.item_name}</h3>
                <CardMedia
                  component="img"
                  height="140"
                  image={place.item_image}
                  alt={place.item_name}
                />
                <p></p>

                <p>{place.item_description}</p>
                <p>จำนวน: {place.quantity}</p>
                <p>วันที่บริจาค: {place.donation_date}</p>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DetailById;
