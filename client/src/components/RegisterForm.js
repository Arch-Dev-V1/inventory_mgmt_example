import React, { useState, useEffect } from "react";
import axios from '../axiosConfig';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleCreateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/register',
            {
                name: username,
                email: email
            },
            {headers: {'Content-Type': 'application/json'}}
            );
            console.log(`Inside CREATE USER ${response.data}`);

            alert(response.data.message);

        } catch (error) {
            console.error('Error creating user', error);
            alert('Failed to create super admin');
        }
    };

    return (

        <form className="login-form" onSubmit={handleCreateUser}>
            <h2>Sign-Up</h2>
            <div className="form-group">
                <label htmlFor="username">Name</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Create User</button>
        </form>
    );
};

export default Register;