import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import Spinner from '../assets/Spinner.svg'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Spinner loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner on login click
    setMessage('');

    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.token.access);
      toast.success('Login successful!'); // Show success toast
      navigate('/profile');
    } catch (error) {
      const errorMsg = error.response?.data?.errors?.non_field_errors[0] || 'Login failed!';
      setMessage(errorMsg);
      toast.error(errorMsg); // Show error toast
    } finally {
      setLoading(false); // Hide spinner after login attempt
    }
  };

  return (
    <div style={styles.loginContainer}>
      <ToastContainer /> {/* Add ToastContainer for showing toasts */}
      <div style={styles.loginCard}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? <img src={Spinner} style={styles.spinner}/> : 'Login'}
          </button> {/* Display spinner when loading */}
        </form>
        {message && <p style={styles.errorMessage}>{message}</p>}
        <p style={styles.linkContainer}>
          <Link to="/" style={styles.link}>Don't have an account? Sign Up</Link>
          <br /> <br/>
          <Link to="/sendpasswordreset" style={styles.link}>Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

// Inline CSS for the Login component
const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f9',
  },
  loginCard: {
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
  linkHover: {
    color: '#0d47a1', // Darker shade for hover effect
  },
  errorMessage: {
    marginTop: '10px',
    color: 'red',
    fontSize: '14px',
  },
  spinner: {
    width: '24px', // Adjust the size of the spinner here
    height: '24px',
  },
};

export default Login;
