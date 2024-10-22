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
                        <input type="text" id='pais' required className='no-spinner'/>
                        <label htmlFor="pais">Pais</label>
                    </div>
                    <div className="input-container">
                        <input type="text" id='ciudad' required className='no-spinner'/>
                        <label htmlFor="ciudad">Ciudad</label>
                    </div>
                    <div className="input-container">
                        <input type="text" id='direccion' required className='no-spinner'/>
                        <label htmlFor="direccion">Direccion</label>
                    </div>
                    <div className="datos-direccion">
                        <div className="input-container">
                            <input type="number" id='piso' required className='no-spinner'/>
                            <label htmlFor="piso">Piso</label>
                        </div>
                        <div className="input-container">
                            <input type="text" id='departamento' required className='no-spinner'/>
                            <label htmlFor="departamento">Departamento</label>
                        </div>
                        <div className="input-container">
                            <input type="number" id='codigoPostal' required className='no-spinner'/>
                            <label htmlFor="codigoPostal">Codigo Postal</label>
                        </div>
                    </div>
                </div>
                <Link to='/payment'> <button>Proceed to payment</button> </Link>
            </div>
        </div>
    )
}

export default CheckoutItem;