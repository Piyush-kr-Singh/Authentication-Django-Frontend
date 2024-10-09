import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../assets/Spinner.svg'

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const API_URL = "https://authentication-django.onrender.com/";

  const changePassword = async (token, newPassword, newPassword2) => {
    return axios.post(API_URL + "changepassword/", {
      password: newPassword,
      password2: newPassword2
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      toast.error('New passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await changePassword(token, newPassword, newPassword2);
      toast.success('Password changed successfully!');
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.non_field_errors
        ? error.response.data.errors.non_field_errors[0]
        : 'An error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.card}>
        <h2 style={styles.heading}>Change Password</h2>
        <form onSubmit={handleChangePassword} style={styles.form}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={newPassword2}
            onChange={e => setNewPassword2(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (
              <img src={Spinner} style={styles.spinner}></img>
            ) : (
              'Change Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f9',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: '24px',
    height: '24px',
  },
};

export default ChangePassword;
