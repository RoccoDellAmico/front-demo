import React, { useState , useContext, useEffect } from "react";
import "./CSS/Profile.css";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUser } from "../redux/OrderSlice";
import { getUserById } from "../redux/UserSlice";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("personal-info");
    //const {getOrdersById, getUserById} = useContext(ShopContext);
    //const [orders, setOrders] = useState([]);
    //const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const { id, token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);
    const { ordersByUser } = useSelector((state) => state.order);

    /*useEffect(() => {
        const fetchOrdenes = async () => {
            const ordenes = await getorderByUserById();
            setOrders(ordenes);
        };
        const fetchUser = async () => {
            const user = await getUserById();
            setuser(user);
        }

        fetchUser();
        fetchOrdenes();
    },[])*/

    useEffect(() => {
        dispatch(getUserById({id, token})).unwrap();
        dispatch(getOrdersByUser({id, token})).unwrap();
    },[dispatch, id, token])

    // Mock data
    const mockUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "/placeholder.svg?height=100&width=100",
    };

    return (
        <div className="container">
            <h1 className="title">My Profile</h1>
            <div className="tabs">
                <button className={`tab ${activeTab === "personal-info" ? "active" : ""}`} onClick={() => setActiveTab("personal-info")}>
                Personal Information
                </button>
                <button className={`tab ${activeTab === "order" ? "active" : ""}`} onClick={() => setActiveTab("order")}>
                My Orders
                </button>
                <Link to='/cart'> <button className={`tab ${activeTab === "cart" ? "active" : ""}`} onClick={() => setActiveTab("cart")}>
                My Cart
                </button> </Link>
            </div>

            <div className="tab-content">
                {activeTab === "personal-info" && (
                <div>
                    <h2>Personal Information</h2>
                    <p>Name: {user.firstName}</p>
                    <p>Surname: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                </div>
                )}

                {activeTab === "order" && (
                <div>
                    <h2>My Orders</h2>
                    <ul>
                    {ordersByUser.map((o) => (
                        <li key={o.orderId}>
                        Total: ${o.total} - {o.orderProducts.map((p) => (
                                                                            <div key={p.id}>
                                                                                {p.product.description} - Talle: {p.size} - Cantidad: {p.quantity} 
                                                                            </div>
                        )) }
                        </li>
                    ))}
                    </ul>
                </div>
                )}

                {/*activeTab === "cart" && (
                <div>
                    <h2>My Cart</h2>
                    <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                        {item.item} - ${item.price.toFixed(2)}
                        </li>
                    ))}
                    </ul>
                </div>
                )*/}
            </div>
        </div>
    );
};

export default Profile;