import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const data = {
                email,
                name,
                password,
                password2,
                tc: true
            };

            const response = await axios.post('http://127.0.0.1:8000/api/user/register/', data);

            if (response.status === 201) {
                toast.success('Registration successful! Please log in.', { autoClose: 3000 });
                setTimeout(() => navigate('/login'), 3000); // Navigate after a delay
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors || [];
                if (error.response.status === 400 && error.response.data.email) {
                    toast.error('User with this email already exists.', { autoClose: 3000 });
                } else if (error.response.status === 400 && error.response.data.password2) {
                    toast.error('Passwords do not match!', { autoClose: 3000 });
                } else {
                    const errorMessage = errors.length ? errors.join(', ') : 'An error occurred. Please try again.';
                    toast.error(errorMessage, { autoClose: 3000 });
                }
            } else {
                toast.error('Network error. Please try again later.', { autoClose: 3000 });
            }
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <ToastContainer />
            <h2 style={styles.header}>Register</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.checkboxGroup}>
                    <input type="checkbox" required /> I accept the terms and conditions
                </div>
                <button type="submit" style={styles.button}>Register</button>
            </form>
            <button onClick={handleLoginRedirect} style={styles.loginButton}>Already have an account? Login</button>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        marginTop : '40px'
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '14px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4CAF50', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
    },
    loginButton: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
        width: '100%',
    },
};

export default Register;
