import React from "react";
import './CSS/Login.css'
import {Link} from 'react-router-dom'

const Login = () => {
    return (
        <div className="login">
            <div className="login-container">
                <h1>LogIn</h1>
                <div className="login-fields">
                    <input type="email" placeholder='Email Address' />
                    <input type="password" placeholder='Password' />
                </div>
                <Link to='/'> <button>Continue</button> </Link>
                <p className="login-forgot-pw">¿Olvidaste tu contraseña? <span>Click aqui</span> </p>
            </div>
        </div>
    )
}

export default Login