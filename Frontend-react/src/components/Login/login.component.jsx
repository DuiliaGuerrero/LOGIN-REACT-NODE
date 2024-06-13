import './login.component.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleBtn = async (event) => {
        event.preventDefault();

        try {
            const data = {
                email: email,
                password: password
            }

            const response = await fetch('http://localhost:9002/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const resData = await response.json();
            localStorage.setItem('jwt', resData.token);
            localStorage.setItem('logedIn', true);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form className="form" onSubmit={handleBtn}>
            <div className="title">Welcome,<br /><span>Sign up to continue</span></div>
            <input onChange={(event) => { setEmail(event.target.value) }} type="email" placeholder="Email" name="email" className="input" required />
            <input onChange={(event) => { setPassword(event.target.value) }} type="password" placeholder="Password" name="password" className="input" required />
            <div className="login-with">
                <div className="button-log"></div>
            </div>
            <Link to="/forgotPass">Forgot password</Link>
            <button type="submit" className="button-confirm">
                Let`s go
            </button>
        </form>
    )
}

export default Login;
