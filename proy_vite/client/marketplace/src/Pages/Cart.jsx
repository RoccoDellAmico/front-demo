import React from 'react'
import CartItems from '../components/CartItems/CartItems'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Cart =() => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <div>
            <CartItems/>
        </div>
    )
}

export default Cart