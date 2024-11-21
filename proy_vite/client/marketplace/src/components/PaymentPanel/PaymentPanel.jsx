import React, { useEffect } from 'react';
import './PaymentPanel.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPayments } from '../../redux/PaymentSlice';

const PayemntPanel = () => {
    const dispatch = useDispatch();
    const { payments, loading, error } = useSelector( state => state.payment );
    const { token } = useSelector( state => state.auth );

    useEffect(() => {
        dispatch(getPayments({ token }));
    }, [dispatch]);

    if (loading) {
        return <p>Loading payments...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div className="paymentpanel">
            <h1>Payments</h1>
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