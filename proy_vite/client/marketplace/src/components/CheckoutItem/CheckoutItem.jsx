import React from "react";
import './CheckoutItem.css'
import { Link } from 'react-router-dom';

const CheckoutItem = () => {

    return (
        <div className="checkout">
            <div className="checkout-container">
                <h1>CheckOut</h1>
                <div className="checkout-fields">
                    <div className="input-container">
                        <input type="text" id='pais' required maxLength={50} onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')}  />
                        <label htmlFor="pais">Country</label>
                    </div>
                    <div className="input-container">
                        <input type="text" id='ciudad' required maxLength={50} onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')}/>
                        <label htmlFor="ciudad">City</label>
                    </div>
                    <div className="input-container">
                        <input type="text" id='direccion' required maxLength={50}/>
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
                            <input type="text" id='departamento' required className='no-spinner' maxLength={3}/>
                            <label htmlFor="departamento">Apartment (optional)</label>
                        </div>
                        <div className="input-container">
                            <input 
                                type="text" 
                                id="codigoPostal" 
                                required 
                                className="no-spinner" 
                                maxLength={6} 
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} 
                            />
                            <label htmlFor="codigoPostal">Postal Code</label>
                        </div>
                    </div>
                </div>
                <Link to='/payment'> <button type="button">Proceed to payment</button> </Link>
            </div>
        </div>
    )
}

export default CheckoutItem;