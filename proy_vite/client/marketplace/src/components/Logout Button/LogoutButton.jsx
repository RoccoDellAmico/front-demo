import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/AuthSlice'; // Adjust the path to your AuthSlice
import './LogoutButton.css';

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const handleClick = async () => {
        try {
            await dispatch(logout({token})).unwrap();
            navigate('/');
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <button className="logout-button" onClick={handleClick}>
            Logout
        </button>
    );
};

export default LogoutButton;