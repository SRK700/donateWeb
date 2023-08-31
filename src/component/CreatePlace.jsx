import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const CreatePlace = () => {
  const [formData, setFormData] = useState({
    item_id: "",
    item_name: "",
    item_description: "",
    item_image: "",
    quantity: "",
    donation_date: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your submit logic here
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
          <TextField
            label="Item Name"
            name="item_name"
            value={formData.item_name}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          {/* Rest of the form fields */}
          <Button
            variant="contained"
            color="success"
            type="submit"
            style={{ marginRight: "10px", marginBottom: "5%" }}
          >
            Add Item
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleFormClose}
            style={{ marginRight: "10px", marginBottom: "5%" }}
          >
            Cancel
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default CreatePlace;
