import React, { useRef } from "react";
import Dashboard from "./Dashbord";
import { Button, TextField, Container, Paper, Typography } from "@mui/material";

function NewLogin() {
    const email = useRef();
    const password = useRef();
    const getEmail = localStorage.getItem("emailData");
    const getPassword = localStorage.getItem("passwordData");

    const handleSubmit = () => {
        if (email.current.value === "cat" && password.current.value === "111") {
            localStorage.setItem("emailData", "cat");
            localStorage.setItem("passwordData", "111");
        }
    }

    return (
        <Container
            component="main"
            maxWidth="100%"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%", // แก้ไขตรงนี้
                backgroundColor: "gray.100",
            }}
        >
            {getEmail && getPassword ? (
                <Dashboard />
            ) : (
                <Paper elevation={3} sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <TextField
                            label="Email"
                            inputRef={email}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            inputRef={password}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            )}
        </Container>
    );
}

export default NewLogin;
