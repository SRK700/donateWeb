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
import TextField from "@mui/material/TextField";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function DetailById({ place }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleAddComment = () => {
    // Add logic to save comment and rating to the backend
    console.log("Comment:", comment);
    console.log("Rating:", rating);

    // Clear comment and rating fields
    setComment("");
    setRating(0);
  };

  return (
    <div>
      แสดงรายละเอียด
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {place && (
            <Card key={place.id} sx={{ maxWidth: 500 }}>
              <CardContent>
                <h3>{place.name}</h3>
                <Rating
                  name={"rating" + place.id}
                  defaultValue={place.score}
                  readOnly
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <CardMedia
                  component="img"
                  height="140"
                  image={place.img}
                  alt={place.name}
                />

                <p>{place.descript}</p>

                <p>
                  <h6>ความคิดเห็น</h6>
                  <ul>
                    {Object.values(place.comment).map((comment, index) => (
                      <li key={index}>{comment.comment_text} โหวต {comment.vote}</li>
                    ))}
                  </ul>
                </p>

                <Rating
                  name="rating"
                  value={rating}
                  precision={0.5}
                  onChange={handleRatingChange}
                />

                <p>
                  <TextField
                    label="แสดงความคิดเห็น"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={handleCommentChange}
                    style={{ width: '100%' }}
                  />
                </p>

                <Button variant="contained" onClick={handleAddComment}>
                  Submit
                </Button>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DetailById;
