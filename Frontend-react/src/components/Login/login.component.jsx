import './login.component.css'
import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Link,
    Navigate
  } from "react-router-dom";

export const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleBtn = async(event) => {
        event.preventDefault();
       
        try {
            const data = {
                email: email,
                password : password
            }
    
            const response = await fetch('http://localhost:9001/api/login',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data) 
            })
    
            const resData = await response.json()
            localStorage.setItem('jwt', resData.token)
            localStorage.setItem('logedIn', true)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <form className="form">
            <div className="title">Welcome,<br/><span>Sign up to continue</span></div>
            <input onChange={(event)=>{setEmail(event.target.value)}} type="email" placeholder="Email" name="email" className="input"/>
            <input onChange={(event)=>{setPassword(event.target.value)}} type="password" placeholder="Password" name="password" className="input"/>
            <div className="login-with">
                <div className="button-log"></div>
            </div>
            <Navigate to="ForgotPass">Forgot password</Navigate>
            <button onClick={handleBtn} className="button-confirm">
                Let`s go
            </button>
    </form>
)
}