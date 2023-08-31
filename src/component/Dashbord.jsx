import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Dashboard() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    item_id: "",
    item_name: "",
    item_description: "",
    item_image: "",
    quantity: "",
    donation_date: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:81/donateAPI/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };

  const handleFormOpen = () => {
    setSelectedItem(null);
    setFormData({
      item_id: "",
      item_name: "",
      item_description: "",
      item_image: "",
      quantity: "",
      donation_date: "",
    });
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedItem) {
      fetch(`http://localhost:81/donateAPI/${selectedItem.item_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((updatedItem) => {
          setData(
            data.map((item) =>
              item.item_id === updatedItem.item_id ? updatedItem : item
            )
          );
          setFormData({
            item_id: "",
            item_name: "",
            item_description: "",
            item_image: "",
            quantity: "",
            donation_date: "",
          });
          setShowForm(false);
          location.reload();
        })
        .catch((error) => {
          console.error("Error updating data to the API:", error);
        });
    } else {
      fetch("http://localhost:81/donateAPI/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((newItem) => {
          setData([...data, newItem]);
          setFormData({
            item_id: "",
            item_name: "",
            item_description: "",
            item_image: "",
            quantity: "",
            donation_date: "",
          });
          setShowForm(false);
          location.reload();
        })
        .catch((error) => {
          console.error("บรรทัด113 post Error", error);
        });
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (item_id) => {
    const itemToEdit = data.find((item) => item.item_id === item_id);
    if (itemToEdit) {
      setSelectedItem(itemToEdit);
      setFormData({
        item_id: itemToEdit.item_id,
        item_name: itemToEdit.item_name,
        item_description: itemToEdit.item_description,
        item_image: itemToEdit.item_image,
        quantity: itemToEdit.quantity,
        donation_date: itemToEdit.donation_date,
      });
      setShowForm(true);
    }
  };

  const handleDelete = (item_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      fetch(`http://localhost:81/donateAPI/${item_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setData(data.filter((item) => item.item_id !== item_id));
        })
        .catch((error) => {
          console.error("Error deleting data from the API:", error);
        });
    }
  };

  return (
    <div style={{ marginTop: "2%", marginLeft: "2%" }}>
      <Button variant="contained" color="primary" onClick={handleFormOpen}>
        เพิ่มสิ่งของบริจาค
      </Button>

      <Button variant="contained" color="error" style={{ float: "right", marginRight: "16px" }} onClick={handleLogout}>
        ออกจากระบบ
      </Button>

      {showForm && (
        <div ref={formRef} style={{ marginTop: "20px" }}>
          <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
            <TextField
              label="Item Name"
              name="item_name"
              value={formData.item_name}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Description"
              name="item_description"
              value={formData.item_description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Image URL"
              name="item_image"
              value={formData.item_image}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Donation Date"
              name="donation_date"
              type="date"
              value={formData.donation_date}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: "20px" }}
            // InputLabelProps={{
            //   shrink: true,
            // }}
            />
            <Button
              variant="contained"
              color="success"
              type="submit"
              style={{ marginRight: "10px", marginBottom: "5%" }}
            >
              {selectedItem ? "Edit Item" : "Add Item"}
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
        </div>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Donation Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.item_id}>
                <TableCell>{item.item_id}</TableCell>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.item_description}</TableCell>
                <TableCell>
                  <img
                    src={item.item_image}
                    alt={item.item_name}
                    style={{ width: "100px" }}
                  />
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.donation_date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(item.item_id)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item.item_id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Dashboard;