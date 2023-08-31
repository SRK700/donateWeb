import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DonationRequestsTable from "./DonationRequestsTable"; // Import DonationRequestsTable
import DetailById from "./DetailById"; // Import DetailById

function ListPlace({ serverName }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [showDonationForm, setShowDonationForm] = useState(false);

  useEffect(() => {
    // Fetch data from the donate API
    fetch(serverName)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [serverName]);

  useEffect(() => {
    // Update the filtered items when the search query changes
    const filtered = data.filter(
      (item) =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
    // Reset to first page when the search query changes
    setCurrentPage(1);
  }, [data, searchQuery]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmitDonationRequest = (event) => {
    event.preventDefault();

    // Submit donation request logic goes here
    // After submission, close the form
    setShowDonationForm(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="my-component-container">
      <Stack
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          label="ค้นหาสิ่งของที่บริจาค"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            width: { sm: 200, md: 300 },
            "& .MuiInputBase-root": { height: 50 },
            m: 2,
          }}
        />

        {filteredItems.length > itemsPerPage && (
          <Pagination
            count={Math.ceil(filteredItems.length / itemsPerPage)}
            page={currentPage}
            onChange={handleChange}
            color="primary"
          />
        )}

        <div className="my-component-cards">
          {currentItems.map((item) => (
            <Card key={item.item_id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.item_image}
                alt={item.item_name}
              />
              <CardContent>
                <h4>{item.item_name}</h4>
                <p>{item.item_description.slice(0, 150)}...</p>
                <p>จำนวนที่มีอยู่: {item.quantity}</p> {/* แสดงจำนวน */}
                <p>วันที่บริจาค: {item.donation_date}</p> {/* แสดงวันที่บริจาค */}
                <DetailById place={item} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowDonationForm(true)}
                >
                  ขอรับบริจาค
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Stack>

      {showDonationForm && (
        <div className="donation-form">
          <DonationRequestsTable
            onSubmit={handleSubmitDonationRequest}
            onCancel={() => setShowDonationForm(false)}
          />
        </div>
      )}
    </div>
  );
}

export default ListPlace;
