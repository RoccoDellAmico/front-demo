import React, { useEffect, useState } from "react";
import './CSS/LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/AuthSlice';
import { createCart } from '../redux/CartSlice';

const LoginSignup =() => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, id, token } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(signup({ firstname, lastname, email, password })).unwrap();
        navigate('/');
    };

    useEffect(() => {
        if (isAuthenticated){
            dispatch(createCart({ id, token }));
        }
    }, [dispatch, isAuthenticated])

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder='Your First Name' value={firstname} 
                        onChange={(e) => setFirstName(e.target.value)}/>
                    <input type="text" placeholder='Your Last Name' value={lastname}
                        onChange={(e) => setLastName(e.target.value)}/>
                    <input type="email" placeholder='Email Address' value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='Password' value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button type='submit' onClick={handleSubmit}>Continue</button>
                <p className="loginsignup-login">Already have an account?
                    <Link to='/logIn'> <span>Login here</span> </Link> 
                </p>
                
            </div>
        </div>
    )
}

export default LoginSignup