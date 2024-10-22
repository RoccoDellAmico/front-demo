import ProductPanel from "../components/ProductsPanel/ProductPanel"
import CartPanel from "../components/CartsPanel/CartsPanel"
import PaymentPanel from "../components/PaymentPanel/PaymentPanel"
import UserPanel from '../components/UserPanel/UserPanel'
import React, {useState} from "react"
import './CSS/AdminPanel.css'
import DiscountPanel from "../components/DiscountPanel/DiscountPanel"
import OrderPanel from "../components/OrderPanel/OrderPanel"

const AdminPanel = ()=>{

    const [activeTab, setActiveTab] = useState("products");

    return(
        <div>
            <h1 className="title">Admin Panel</h1>
            <div className="tabs">
                <button className={`tab ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
                    Users
                </button>
                <button className={`tab ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>
                    Products
                </button>
                <button className={`tab ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}>
                    Orders
                </button>
                <button className={`tab ${activeTab === "payments" ? "active" : ""}`} onClick={() => setActiveTab("payments")}>
                    Payments
                </button>
                <button className={`tab ${activeTab === "discounts" ? "active" : ""}`} onClick={() => setActiveTab("discounts")}>
                    Discounts
                </button>
            </div>

            <div className="tab-content">
                {activeTab === "products" && (<ProductPanel/>)}
                {activeTab === "users" && (<UserPanel/>)}
                {activeTab === "orders" && (<OrderPanel/>)}
                {activeTab === "payments" && (<PaymentPanel/>)}
                {activeTab === "discounts" && (<DiscountPanel/>)}
            </div>
        </div>
    )
}

export default AdminPanel