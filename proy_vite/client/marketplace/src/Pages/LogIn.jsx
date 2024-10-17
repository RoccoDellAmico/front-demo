import React, {useState , useEffect} from "react";
import './CSS/Login.css'
import {Link} from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        
    }

    return (
        <div className="login">
            <div className="login-container">
                <h1>LogIn</h1>
                <div className="login-fields">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                </div>
                <Link to='/'> <button type={"submit"} onClick={handleSubmit} >Continue</button> </Link>
                <p className="login-forgot-pw">¿Olvidaste tu contraseña? <span>Click aqui</span> </p>
            </div>
        </div>
    )
}

export default Login