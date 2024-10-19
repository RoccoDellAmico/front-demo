import React, { useState , useContext } from 'react'
import './CSS/LoginSignup.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { ShopContext } from '../Context/ShopContext'

const LoginSignup =() => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {changeLogueado} = useContext(ShopContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(firstName);
            console.log(lastName);
            await AuthService.signup(firstName, lastName, email, password);
            console.log('Succesful');
            changeLogueado();
            navigate('/');
        } catch(error) {
            console.error('Error');
            setErrorMessage('Signup failed');
        }
    }

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder='Your First Name' value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}/>
                    <input type="text" placeholder='Your Last Name' value={lastName}
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
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to use the terms of use & privacy policy</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup