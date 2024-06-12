import './forgotpass.component.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleBtn = async (event) => {
        event.preventDefault();
       
        try {
            const data = { email };
            const response = await fetch('http://localhost:9001/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            });

            if (!response.ok) {
                const resData = await response.json();
                setError(resData.message || 'Something went wrong');
                return;
            }

            const resData = await response.json();
            localStorage.setItem('jwt', resData.token);
            localStorage.setItem('logedIn', true);
            navigate('/Login');
        } catch (err) {
            setError('Failed to connect to the server');
            console.log(err);
        }
    };

    return (
        <form className="form">
            <div className="title">Forgot Password,<br/><span>Write your email to continue</span></div>
            {error && <div className="error">{error}</div>}
            <input 
                onChange={(event) => setEmail(event.target.value)} 
                type="email" 
                placeholder="Email" 
                name="email" 
                className="input" 
            />
            <div className="login-with">
                <div className="button-log"></div>
            </div>
            <button onClick={handleBtn} className="button-confirm">
                Send Email
            </button>
        </form>
    );
}
