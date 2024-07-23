import React, { useState } from 'react';
import axios from '../axiosConfig';

import { useLocation, useNavigate } from 'react-router-dom';

const SetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(confirmPassword != password) {
            alert('Password and confirm password are not same');
            return;
        }
        
        try {
            const response = await axios.post('/api/auth/set-password', {token, password});
            console.log(`Inside CREATE PASSWORD ===========${response.data}`);

            alert(response.data.message);
            navigate('/login');

        } catch(error) {
            alert('Failed to set password');
        }
    };

    return(
        <>
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Set Password</h2>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}/>
            </div>
            <button type="submit">Create Password</button>
        </form>
    </>
    );
}

export default SetPasswordForm;