import React, {useState, useEffect} from "react";
import axios from '../axiosConfig'
import {Link} from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import '../css/LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('/api/auth/login', { email, password });
          alert('Login successful');
          navigate('/home');
          // Handle the response, save token, redirect, etc.
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(`Failed to log in: ${error.response.data.message || 'Unknown error'}`);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
                alert('Failed to log in: No response from server');
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                alert(`Failed to log in: ${error.message}`);
              }
        }
      };

    return (
        <>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
                {
            }
            </form>
        </>
    );
};

export default LoginForm;
