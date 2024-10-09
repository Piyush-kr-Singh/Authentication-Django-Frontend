import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import ResetPassword from './components/ResetPassword';
import Logout from './components/Logout';
import SendResetPasswordEmail from './components/SendResetPasswordEmail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/api/user/reset/:uid/:token" element={<ResetPassword />} />
          <Route path="/sendpasswordreset" element={<SendResetPasswordEmail />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
