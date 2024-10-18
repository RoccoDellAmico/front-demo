import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import {Link} from 'react-router-dom'

const LoginSignup =() => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        if (name === '' || email === '' || password === '' || !isChecked) {
            e.preventDefault();
            setErrorMessage('Please, complete all fields and agree to the terms');
            setTimeout(() => {
                setErrorMessage('');
            }, 2000); 
        } else {
            setErrorMessage('');
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                </div>
                <div className="loginsignup-agree">
                    <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                    <p>By continuing, I agree to use the terms of use & privacy policy</p>
                </div>
                <Link to='/' onClick={handleSubmit}>
                    <button>Continue</button>
                </Link>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <p className="loginsignup-login">Already have an account?
                    <Link to='/logIn'> <span>Login here</span> </Link> 
                </p>
                
            </div>
        </div>
    )
}

export default LoginSignup