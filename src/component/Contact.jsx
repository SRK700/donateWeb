import React from 'react';
import { Paper, Typography, TextField, Button, Grid, Container } from '@mui/material';
import { Send } from '@mui/icons-material';

const Contact = () => {
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: 20 }}>
                <Typography variant="h5" gutterBottom>
                    ติดต่อเรา
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="ชื่อ" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="อีเมล" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth multiline label="ข้อความ" variant="outlined" rows={4} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                endIcon={<Send />}
                            >
                                ส่งข้อความ
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Contact;
