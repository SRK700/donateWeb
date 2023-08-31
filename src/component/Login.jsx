import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        // ตรวจสอบการเข้าสู่ระบบ
        if (username === 'user' && password === '123456') {
            setLoggedIn(true);
            window.location.href = './dashboard';
        } else {
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            {loggedIn ? (
                <div>
                    <Typography variant="h6">ยินดีต้อนรับ, {username}!</Typography>
                </div>
            ) : (
                <div>
                    <TextField
                        label="ชื่อผู้ใช้"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ margin: '10px' }}
                    />
                    <br />
                    <TextField
                        type="password"
                        label="รหัสผ่าน"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ margin: '10px' }}
                    />
                    <br />
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        เข้าสู่ระบบ
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Login;
