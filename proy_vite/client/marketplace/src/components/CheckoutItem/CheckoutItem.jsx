import React, { useState } from "react";
import './CheckoutItem.css'
import { useNavigate } from 'react-router-dom';

const CheckoutItem = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleProceedToPayment = (e) => {
        if (!country || !city || !address || !postalCode) {
            e.preventDefault();
            setShowPopup(true);
        }
        else{
            navigate('/payment');
        }
    };
    
    return (
        <div className="checkout">
            <div className="checkout-container">
                <h1>CheckOut</h1>
                <div className="checkout-fields">
                    <div className="input-container">
                        <input type="text" id='pais' required maxLength={50} value={country} onChange={(e) => setCountry(e.target.value)} onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')}  />
                        <label htmlFor="pais">Country</label>
                    </div>
                    <div className="input-container">
                        <input type="text" id='ciudad' required maxLength={50} value={city} onChange={(e) => setCity(e.target.value)} onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')}/>
                        <label htmlFor="ciudad">City</label>
                    </div>
                    <div className="input-container">
                        <input type="text" id='direccion' value={address} onChange={(e) => setAddress(e.target.value)} required maxLength={50}/>
                        <label htmlFor="direccion">Adress</label>
                    </div>
                    <div className="datos-direccion">
                        <div className="input-container">
                        <input 
                            type="text" 
                            id="piso" 
                            required 
                            className="no-spinner" 
                            maxLength={2} 
                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} 
                        />
                        <label htmlFor="piso">Floor (optional)</label>
                        </div>
                        <div className="input-container">
                            <input type="text" id='departamento' required  maxLength={10}/>
                            <label htmlFor="departamento">Apartment (optional)</label>
                        </div>
                        <div className="input-container">
                            <input 
                                type="text" 
                                id="codigoPostal" 
                                required 
                                className="no-spinner" 
                                maxLength={6}
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)} 
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} 
                            />
                            <label htmlFor="codigoPostal">Postal Code</label>
                        </div>
                    </div>
                </div>
                <button type="button" onClick={handleProceedToPayment}>Proceed to payment</button>
            </div>
            {showPopup && (
                <div className="popup">
                    <p>Please fill in all required fields.</p>
                    <button onClick={() => setShowPopup(false)}>X</button>
                </div>
            )}
        </div>
    )
}

export default CheckoutItem;