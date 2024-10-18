import React, { useState } from "react";
import "./CSS/Profile.css";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("personal-info");

    // Mock data
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "/placeholder.svg?height=100&width=100",
    };
    const purchases = [
        { id: 1, item: "Manchester United Home Kit 2023/24", date: "2023-08-15", price: 89.99 },
        { id: 2, item: "Real Madrid Away Kit 2023/24", date: "2023-09-02", price: 94.99 },
        { id: 3, item: "Barcelona Third Kit 2023/24", date: "2023-09-20", price: 84.99 },
    ];
    const cartItems = [
        { id: 1, item: "Liverpool Home Kit 2023/24", price: 79.99 },
        { id: 2, item: "Bayern Munich Away Kit 2023/24", price: 89.99 },
    ];

    return (
        <div className="container">
            <h1 className="title">My Profile</h1>
            <div className="tabs">
                <button className={`tab ${activeTab === "personal-info" ? "active" : ""}`} onClick={() => setActiveTab("personal-info")}>
                Personal Information
                </button>
                <button className={`tab ${activeTab === "purchases" ? "active" : ""}`} onClick={() => setActiveTab("purchases")}>
                My Purchases
                </button>
                <button className={`tab ${activeTab === "cart" ? "active" : ""}`} onClick={() => setActiveTab("cart")}>
                My Cart
                </button>
            </div>

            <div className="tab-content">
                {activeTab === "personal-info" && (
                <div>
                    <h2>Personal Information</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
                )}

                {activeTab === "purchases" && (
                <div>
                    <h2>My Purchases</h2>
                    <ul>
                    {purchases.map((purchase) => (
                        <li key={purchase.id}>
                        {purchase.item} - {purchase.date} - ${purchase.price.toFixed(2)}
                        </li>
                    ))}
                    </ul>
                </div>
                )}
                
                {activeTab === "cart" && (
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
                )}
            </div>
        </div>
    );
};

export default Profile;