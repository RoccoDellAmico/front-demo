import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdersByUser } from '../redux/OrderSlice';
import './CSS/FinishPurchase.css';

const FinishPurchase = () => {

    const dispatch = useDispatch();
    const { id, token } = useSelector((state) => state.auth);
    const { ordersByUser } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrdersByUser({ id, token }));
    }, [dispatch, id, token]);

    // Asegúrate de que `ordersByUser` tenga datos antes de acceder a ellos
    if (!ordersByUser || ordersByUser.length === 0) {
        return <p>Loading...</p>;
    }

    // Corrige el índice para acceder al último pedido
    const order = ordersByUser[ordersByUser.length - 1];

    return (
        <div className="cartitems-container">

        
            <div className="cartitems">
                <h1>Thank you for your purchase!</h1>

                <h2>Your order number is: {order.orderId}</h2>

                <div className="cartitems-format-main">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Size</p>
                    <p>Quantity</p>
                    <p>Total</p>
                </div>
                <hr/>

                {order.orderProducts.map((product) => {
                    return (
                        <div key={product.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={product.product.photos[0]} alt="" className="carticon-product-icon" />
                                <p>{product.product.description}</p>
                                <p>${product.product.price}</p>
                                <p>{product.size}</p>
                                <p>{product.quantity}</p>
                                <p> ${ product.product.price * product.quantity } </p>
                            </div>
                            <hr />
                        </div>
                    )
                })}

                <h2>Your order total is: ${order.total}</h2>

                <Link to='/'> <button className='botones'>CONTINUE</button> </Link>
            </div>
        </div>
    )
}

export default FinishPurchase