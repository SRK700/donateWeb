import React, { useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from "@mui/material";

function DonationRequestsForm({ onSubmit, onCancel }) {
    const [donorName, setDonorName] = useState("");
    const [requestedBy, setRequestedBy] = useState("");
    const [address, setAddress] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new donation request object
        const newDonationRequest = {
            donor_name: donorName,
            requested_by: requestedBy,
            address: address,
            quantity: quantity
        };

        // Call the parent component's onSubmit function and pass the new donation request data
        onSubmit(newDonationRequest);

        // Clear the form fields
        setDonorName("");
        setRequestedBy("");
        setAddress("");
        setQuantity("");
    };
    const handleRequestDonation = (item) => {
        // Create a new donation request object
        const newDonationRequest = {
            donor_id: item.donor_id,
            donor_name: item.donor_name,
            requested_by: item.requested_by,
            address: item.address,
            quantity: item.quantity,
            phone: item.phone,
            email: item.email,
        };

        // Send the new donation request to the server (you may need to adjust the API endpoint)
        fetch("http://localhost:81/donateAPI/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDonationRequest),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    // Remove the donated quantity from the donate item in the database
                    const updatedItem = {
                        ...item,
                        quantity: item.quantity - newDonationRequest.quantity,
                    };

                    // Update the donate item in the database (you may need to adjust the API endpoint)
                    fetch(`http://localhost:81/donateAPI/${item.item_id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedItem),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === "success") {
                                // Update the donations state with the new data
                                setDonations((prevDonations) =>
                                    prevDonations.filter((donation) => donation.item_id !== item.item_id)
                                );
                            } else {
                                console.error("Error updating donate item:", data.message);
                            }
                        })
                        .catch((error) => {
                            console.error("Error updating donate item:", error);
                        });
                } else {
                    console.error("Error requesting donation:", data.message);
                }
            })
            .catch((error) => {
                console.error("Error requesting donation:", error);
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ชื่อผู้บริจาค</TableCell>
                            <TableCell>ขอรับบริจาคโดย</TableCell>
                            <TableCell>ที่อยู่</TableCell>
                            <TableCell>จำนวน</TableCell>
                            <TableCell>ดำเนินการ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    value={donorName}
                                    onChange={(e) => setDonorName(e.target.value)}
                                    required
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    value={requestedBy}
                                    onChange={(e) => setRequestedBy(e.target.value)}
                                    required
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleRequestDonation(donation)}
                                >
                                    ขอรับบริจาค
                                </Button>
                                <Button variant="contained" color="secondary" onClick={onCancel}>
                                    ยกเลิก
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </form>
    );
}

export default DonationRequestsForm;
