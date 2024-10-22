import React, {useContext,useState,useEffect} from "react";
import './OrderPanel.css';
import { ShopContext } from "../../Context/ShopContext";

const OrderPanel = () => {

    const {getOrders} = useContext(ShopContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await getOrders();
            console.log('ORDERS',orders);
            setOrders(orders);
        }
        fetchOrders();
    },[])

    return (
        <div>
            <ul>
                {orders.map((o) => (
                    <li key={o.orderId}>
                    Order_Id: {o.orderId} - Total: ${o.total} - {o.orderProducts.map((p) => (
                                                            <div key={p.id}>
                                                                {p.product.description} - Talle: {p.size} - Cantidad: {p.quantity} 
                                                            </div>
                    )) }
                    </li>
                ))}
                </ul>
        </div>
    )
}

export default OrderPanel;