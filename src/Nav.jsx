import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Place from './assets/donate.png'
const MyMenu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={Place} style={{ width: "80px" }} />DONATY
        </Typography>
        <Button color="inherit" href="/place/create">บริจาคสิ่งของ</Button>
        <Button color="inherit" href="/">รายชื่อสิ่งของบริจาค</Button>
        {/*   <Button color="inherit" href="place/create">เพิ่มข้อมูลสถานที่ท่องเที่ยว</Button>*/}
        <Button color="inherit" href='/contact'>ติดต่อเรา</Button>
        {/* <Button color="inherit" href="/dashboard">แดชบอร์ด</Button> */}
        <Button color="inherit" href="/Login">เข้าสู่ระบบ</Button>

      </Toolbar>
    </AppBar>
  );
};

export default MyMenu;
