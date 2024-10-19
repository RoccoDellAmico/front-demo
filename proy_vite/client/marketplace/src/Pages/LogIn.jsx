import React, { useState , useEffect , useContext } from "react";
import './CSS/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from "../services/AuthService";
import { ShopContext } from  '../Context/ShopContext'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {changeLogueado} = useContext(ShopContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await AuthService.login(email, password);
            console.log('Succesful login')
            changeLogueado();
            navigate('/');
        } catch(error) {
            console.error('Failed login');
            setErrorMessage('The email address or password is incorrect.');
        }
    }

    return (
        <div className="login">
            <div className="login-container">
                <h1>LogIn</h1>
                <div className="login-fields">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type={"submit"} onClick={handleSubmit} >Continue</button>
                <p className="login-forgot-pw">¿Olvidaste tu contraseña? <span>Click aqui</span> </p>
            </div>
        </div>
    )
}

export default Login