import React, { useState } from 'react';
import AuthService from '../services/AuthService'; 
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import Spinner from '../assets/Spinner.svg'; // Make sure you have the correct path

function SendResetPasswordEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const handleSendLink = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      if (!email) {
        toast.error('Please enter a valid email address'); // Error toast
        setLoading(false);
        return;
      }

      await AuthService.sendResetPasswordEmail(email);
      toast.success('Password reset link sent to your email!'); // Success toast
      setLoading(false);

      setTimeout(() => navigate('/login'), 3000); // Navigate after a delay
    } catch (error) {
      toast.error(error.response?.data?.errors?.non_field_errors[0] || 'Error sending link'); // Error toast
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Send Password Reset Link</h2>
        <form onSubmit={handleSendLink} style={styles.form}>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? <img src={Spinner} alt="Loading" style={styles.spinner} /> : 'Send Reset Link'}
          </button>
        </form>
        <p style={styles.linkContainer}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
      <ToastContainer /> {/* Toast container to display toasts */}
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
  linkContainer: {
    marginTop: '15px',
  },
  link: {
    color: '#2196F3',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s',
  },
  spinner: {
    width: '24px', // Adjust the size of the spinner here
    height: '24px',
  },
};

export default SendResetPasswordEmail;
