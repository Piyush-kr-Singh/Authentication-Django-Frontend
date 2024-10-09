import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService'; // Ensure this points to the right location
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import Spinner from '../assets/Spinner.svg';

function ResetPassword() {
  const { uid, token } = useParams(); // Capture uid and token from URL
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false); // State for spinner
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner

    if (password !== password2) {
      toast.error('Passwords do not match');
      setLoading(false); // Hide spinner
      return;
    }

    try {
      await AuthService.resetPassword(uid, token, password, password2);
      toast.success('Password reset successful');

      setTimeout(() => {
        setLoading(false); // Hide spinner
        navigate('/login');
      }, 3000);
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Reset Your Password</h2>
        <form onSubmit={handlePasswordReset} style={styles.form}>
          <input
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? <img src={Spinner} alt="Loading" style={styles.spinner} /> : 'Reset Password'}
          </button>
        </form>
        {/* Toast Notification Container */}
        <ToastContainer />
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
  },
  spinner: {
    width: '24px', // Adjust the size of the spinner here
    height: '24px',
  },
};

export default ResetPassword;
