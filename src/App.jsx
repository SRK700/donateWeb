import React from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import ListPlace from './component/ListPlace'
import CreatePlace from './component/CreatePlace'
import Contact from './component/Contact'
import Dashboard from './component/Dashbord';
import Nav from './Nav'
import Login from './component/Login';

import DonationRequestsTable from './component/DonationRequestsTable'
import NewLogin from './component/NewLogin';

function App() {
  const serverName = "http://localhost:81/donateAPI/";
  return (
    <div>
      <Nav />
      <BrowserRouter>
        <Routes>

          <Route index element={<ListPlace serverName={serverName} />} />
          <Route path="place/create" element={<CreatePlace serverName={serverName} />} />
          <Route path='dashboard' element={<Dashboard serverName={serverName} />} />
          <Route path='contact' element={<Contact serverName={serverName} />} />
          <Route path='Login' element={<NewLogin serverName={serverName} />} />
          {/* <Route
            path="/donation-requests"
            element={<DonationRequestsTable />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App