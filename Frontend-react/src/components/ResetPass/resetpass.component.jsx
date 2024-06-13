import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPass = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const handleBtn = async (event) => {
        event.preventDefault();

        const data = {
            id:id,
            password: password
        };

        try {
            const response = await fetch('http://localhost:9002/api/update-user', {
                method: 'PUT',
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

            setSuccess('Password reset successfully.');
            setError('');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError('Failed to connect to the server');
            setSuccess('');
            console.log(err);
        }
        console.log(data)
    };

    

    return (
        <form className="form" onSubmit={handleBtn}>
            <div className="title">Reset Password</div>
            <input onChange={(event) => { setPassword(event.target.value) }} type="password" placeholder="New Password" name="password" className="input" required />
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <button type="submit" className="button-confirm">
                Reset Password
            </button>
        </form>
    )
}

export default ResetPass;
