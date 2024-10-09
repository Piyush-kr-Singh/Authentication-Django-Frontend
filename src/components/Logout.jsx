import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to the login page
  }, [navigate]);

  return null; // Render nothing while navigating
}

export default Logout;
