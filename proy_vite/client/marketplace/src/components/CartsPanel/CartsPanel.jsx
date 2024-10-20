import React, { useState, useEffect } from 'react';
import CartService from '../../services/CartService';
import './CartsPanel.css';

const CartPanel = () => {

    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        CartService.getCartsAdmin()
        .then(response => {
            setCarts(response.data || []);
            console.log(response.data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setError('Failed to fetch carts');
            setLoading(false);
        })
    },[])

    if (loading) {
        return <p>Loading carts...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="cartpanel">
            <h1>Carts</h1>
            <div className="cartpanel-format-main">
                <p>Id</p>
                <p>Email</p>
                <p>Productos</p>
            </div>
            <br />
            {carts.map((cart) => (
                <div key={cart.cartId}>
                    <div className="cartpanel-format cartpanel-format-main">
                        <p>{cart.cartId}</p>
                        <p>{cart.userEmail}</p>
                    </div>
                    <div>
                        {cart.cartProducts && cart.cartProducts.length > 0 ? (
                            <ul>
                                {cart.cartProducts.map((cartProduct) => (
                                    <li key={cartProduct.id}>
                                        <div>
                                            <strong>Producto:</strong> {cartProduct.product.description} 
                                            <br />
                                            <strong>Precio:</strong> ${cartProduct.product.price.toFixed(2)}
                                            <br />
                                            <strong>Cantidad:</strong> {cartProduct.quantity}
                                            <br />
                                            <strong>Tamaños:</strong>
                                            <ul>
                                                {Object.entries(cartProduct.product.productStock).map(([size, stock]) => (
                                                    <li key={size}>
                                                        {size}: {stock} disponible
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay productos en este carrito.</p>
                        )}
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default CartPanel