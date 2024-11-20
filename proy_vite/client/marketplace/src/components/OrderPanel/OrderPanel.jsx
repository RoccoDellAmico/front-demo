import React, {useContext,useState,useEffect} from "react";
import './OrderPanel.css';
//import { ShopContext } from "../../Context/ShopContext";
import { useSelector , useDispatch } from "react-redux";
import { getOrders } from "../../redux/OrderSlice";

const OrderPanel = () => {

    //const {getOrders} = useContext(ShopContext);
    //const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth)
    const { orders } = useSelector((state) => state.order)

    useEffect(() => {
        dispatch(getOrders({ token}))
    }, [dispatch, token])

    /*
    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await getOrders();
            console.log('ORDERS',orders);
            setOrders(orders);
        }
        fetchOrders();
    },[])*/

    return (
        <>
            <div className="order-panel">
                <h1>Orders</h1>
                <div className="order-container">
                <ul>
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
                </ul>

                </div>
            </div>
        </>
    )
}

export default OrderPanel;