import React, {useState , useEffect} from "react";
import './CSS/Login.css'
import {Link} from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        if (email === '' || password === '') {
            e.preventDefault();
            setErrorMessage('Please, complete all fields');
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        } else {
            setErrorMessage('');
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <h1>LogIn</h1>
                <div className="login-fields">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                </div>
                <Link to='/' onClick={handleSubmit}>
                    <button type="submit">Continue</button>
                </Link>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <p className="login-forgot-pw">Forgot your password? <span>Click here</span> </p>
                <p className="login-forgot-pw">Don't have an account? <Link to='/signUp'> <span>Sign Up</span></Link> </p>
            </div>
        </div>
    )
}

export default Login