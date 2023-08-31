import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const CreatePlace = () => {
  const [formData, setFormData] = useState({
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
      [name]: name === "donation_date" ? formatDateString(value) : value,
    });
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:81/donateAPI/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Clear the form and update the data on successful submission
        setFormData({
          item_name: "",
          item_description: "",
          item_image: "",
          quantity: "",
          donation_date: "",
        });

        // Perform any other actions you need after successful submission
      } else {
        console.error("Error posting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleFormClose = () => {
    // Handle closing the form if needed
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
            label="ชื่อสิ่งของ"
            name="item_name"
            value={formData.item_name}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="รายละเอียด"
            name="item_description"
            value={formData.item_description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="รูปภาพ(URL)"
            name="item_image"
            value={formData.item_image}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="จำนวน"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField

            name="donation_date"
            type="date"
            value={formData.donation_date}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="success"
            type="submit"
            style={{ marginRight: "10px", marginBottom: "5%" }}
          >
            บริจาค
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleFormClose}
            style={{ marginRight: "10px", marginBottom: "5%" }}
          >
            ยกเลิก
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default CreatePlace;

