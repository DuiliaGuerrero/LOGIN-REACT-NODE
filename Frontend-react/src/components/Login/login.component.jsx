import './login.component.css'
import React, {useState} from "react";
export const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleBtn = (event) => {
        event.preventDefault();
       
        const data = {
            email: email,
            password : password
        }

        fetch('http://localhost:9001/api/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data) 
        })
        .then(res => res.json())
        .then(result => {console.log(result)})
        .catch(error => {
            console.log({ error })
        })
    }

    return (
        <form className="form">
            <div className="title">Welcome,<br/><span>Sign up to continue</span></div>
            <input onChange={(event)=>{setEmail(event.target.value)}} type="email" placeholder="Email" name="email" className="input"/>
            <input onChange={(event)=>{setPassword(event.target.value)}} type="password" placeholder="Password" name="password" className="input"/>
            <div className="login-with">
                <div className="button-log"></div>
            </div>
            <button onClick={handleBtn} className="button-confirm">
                Let`s go
            </button>
    </form>
)
}