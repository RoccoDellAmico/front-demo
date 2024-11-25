import React, { useEffect } from "react";
import './OrderPanel.css';
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/OrderSlice";

const OrderPanel = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { orders, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrders({ token }));
    }, [dispatch]);

    if(error){
        return <p>{error}</p>
    }

    return (
        <div className="order-panel">
            <h1>Orders</h1>
            <div className="order-container">
                {orders.length === 0 ? (<p>No orders found</p>) :
                (<ul>
                    {orders.map((o) => (
                        <li key={o.orderId}>
                        Order_Id: {o.orderId} - Total: ${o.total} - {o.orderProducts.map((p) => (
                            <div key={p.id}>
                                {p.product.description} - Talle: {p.size} - Cantidad: {p.quantity} 
                            </div>
                        )) }
                        <br />
                        </li>
                    ))}
                </ul>)}
            </div>
        </div>
    )
}

export default OrderPanel;