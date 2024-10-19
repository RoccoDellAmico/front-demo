import React, { useState, useEffect } from 'react';
import './PaymentPanel.css';
import PaymentService from "../../services/PaymentService";

const PayemntPanel = () => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect( () => {
        PaymentService.getPaymentAdmin()
        .then(response => {
            setPayments(response.data || []);
            console.log(response.data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setError('Failed to fetch payments');
            setLoading(false);
        })
    },[])

    if (loading) {
        return <p>Loading payments...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div className="paymentpanel">
            <h1>Users</h1>
            <div className="paymentpanel-format-main">
                <p>Id</p>
                <p>Date</p>
                <p>Id-Order</p>
                <p>Id-User</p>
                <p>Payment Method</p>
                <p>Total</p>
            </div>
            <br />
            {payments.map( (e) => {
                return (
                    <div key={e.id}>
                        <div className="paymentpanel-format userpanel-format-main">
                            <p>{e.id}</p>
                            <p>{e.date}</p>
                            <p>{e.idOrder}</p>
                            <p>{e.idUser}</p>
                            <p>{e.paymentMethod}</p>
                            <p>${e.total}</p>
                        </div>
                        <hr />
                    </div>
                )
            } )}
        </div>
    )
}

export default PayemntPanel;