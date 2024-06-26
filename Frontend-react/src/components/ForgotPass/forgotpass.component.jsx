import './forgotpass.component.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleBtn = async (event) => {
        event.preventDefault();
       
        try {
            const data = { email };
            const response = await fetch('http://localhost:9002/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            });

            if (!response.ok) {
                const resData = await response.json();
                setError(resData.message || 'Something went wrong');
                setSuccess('');
                return;
            }

            setSuccess('Email sent successfully. Please check your inbox.');
            setError('');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError('Failed to connect to the server');
            setSuccess('');
            console.log(err);
        }
    };

    return (
        <form className="form" onSubmit={handleBtn}>
            <div className="title">Forgot Password,<br/><span>Write your email to continue</span></div>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <input 
                onChange={(event) => setEmail(event.target.value)} 
                type="email" 
                placeholder="Email" 
                name="email" 
                className="input" 
                required
            />
            <div className="login-with">
                <div className="button-log"></div>
            </div>
            <button type="submit" className="button-confirm">
                Send Email
            </button>
        </form>
    );
}

export default ForgotPassword;
