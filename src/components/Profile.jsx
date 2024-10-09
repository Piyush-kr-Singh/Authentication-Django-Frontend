import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function Profile() {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AuthService.getProfile(token);
        setProfile(response.data);
      } catch (error) {
        console.log(error);
        // Optionally, navigate to login if there's an error fetching the profile (e.g., token expired)
        navigate('/login');
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to the login page
  };

  const handleChangePassword = () => {
    navigate('/change-password'); // Redirect to the change password page
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileCard}>
        <h2 style={styles.heading}>Profile</h2>
        <div style={styles.profileInfo}>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Name:</strong> {profile.name}</p>
        </div>
        <button onClick={handleChangePassword} style={styles.changePasswordButton}>
          Change Password
        </button>
        <br / > <br />
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}

// Inline CSS for the Profile component
const styles = {
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f9',
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    borderBottom: '2px solid #4CAF50',
    paddingBottom: '10px',
  },
  profileInfo: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.6',
  },
  changePasswordButton: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#2196F3', // Blue color for change password
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f44336', // Red color for logout
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default Profile;
