import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import visa from '../../assets/tarjetas/visa.svg'
import amex from '../../assets/tarjetas/amex.svg'
import maestro from '../../assets/tarjetas/maestro.svg'
import mastercard from '../../assets/tarjetas/mastercard.svg'
import paypal from '../../assets/tarjetas/paypal.svg'
import hsbc from '../../assets/tarjetas/hsbc.svg'
import santander from '../../assets/tarjetas/santander.svg'
import naranja from '../../assets/tarjetas/naranja.svg'
import icbc from '../../assets/tarjetas/icbc.svg'
import ciudad from '../../assets/tarjetas/ciudad.png'
import supervielle from '../../assets/tarjetas/supervielle.png'
import cencosud from '../../assets/tarjetas/cencosud2.png'
import patagonia from '../../assets/tarjetas/patagonia.png'
import './PaymentItem.css'



const PaymentItem = () => {

    const [cuotas, setCuotas] = useState('')
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { clearCart , placeOrder } = useContext(ShopContext);
    const navigate = useNavigate();


    const handlePayClick = () => {
        const numeroTarjeta = document.getElementById('numero_tarjeta').value;
        const titular = document.getElementById('titular').value;
        const vencimiento = document.getElementById('vencimiento').value;
        const cvv = document.getElementById('CVV').value;
        const nombre = document.getElementById('nombre').value;
        const cuotas = document.getElementById('cuotas').value;
        const DNI = document.getElementById('DNI').value;
        const telefono = document.getElementById('Telefono').value;

        if (!numeroTarjeta || !titular || !vencimiento || !cvv || !nombre || !cuotas || !DNI || !telefono) {
            setErrorMessage('Please complete all fields');
            return;
        }

        setErrorMessage('');
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            clearCart();
            navigate('/');
        }, 2000);

        placeOrder();
    };

    return (
        <div className='payment'>
            <div className="payment-container">
            <h1>Payment Method</h1>
                <div className="payment-fields">
                <div className="input-container">
            <input 
                type="text" 
                id="numero_tarjeta" 
                required 
                className="no-spinner" 
                maxLength={16} 
                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} 
            />
            <label htmlFor="numero_tarjeta">Card number</label>
            </div>
                    <div className="payment-fields-data">
                        <div className="input-container">
                            <input type="text" id='titular' required maxLength={50} onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')}/>
                            <label htmlFor="titular">Card owner</label>
                        </div>
                        <div className="input-container">
                            <input 
                                type="text" 
                                id="vencimiento" 
                                required 
                                className="no-spinner" 
                                maxLength={5} 
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9/]/g, '')} 
                            />
                            <label htmlFor="vencimiento">Expiration date (MM/YY)</label>
                            </div>
                        <div className="input-container">
                            <input 
                                type="text" 
                                id="CVV" 
                                required 
                                className="no-spinner" 
                                maxLength={4} 
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} 
                            />
                            <label htmlFor="CVV">Security code</label>
                        </div>
                    </div>
                    <div className="input-container">
                        <input type="text" id="nombre" required onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')}/>
                        <label htmlFor="nombre">Name</label>
                    </div>
                    <div className="cuotas">
                        <select name="cuotas" id="cuotas" value={cuotas} onChange={(e) => setCuotas(e.target.value)}>
                            <option value="" disabled>Select the number of installments</option>
                            <option value="1 cuota">1 installment</option>
                            <option value="3 cuotas">3 installments</option>
                            <option value="6 cuotas">6 installments</option>
                            <option value="9 cuotas">9 installments</option>
                        </select>
                    </div>
                    <div className="datos-titular">
                        <div className="input-container">
                        <input 
                            type="text" 
                            id="DNI" 
                            required 
                            className="no-spinner" 
                            maxLength={10} 
                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} 
                        />
                        <label htmlFor="DNI">ID number</label>
                        </div>
                        <div className="input-container">
                            <input 
                                type="text" 
                                id="Telefono" 
                                required 
                                className="no-spinner" 
                                maxLength={15} 
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} 
                            />
                            <label htmlFor="Telefono">Phone number</label>
                            </div>
                    </div>
                </div>

                <div className="tajetas">
                    <p>Accepted cards</p>
                    <div className="tarjetas-aceptadas">
                        <img src={visa} alt="" />
                        <img src={amex} alt="" />
                        <img src={maestro} alt="" />
                        <img src={paypal} alt="" />
                        <img src={mastercard} alt="" />
                        <img src={hsbc} alt="" />
                        <img src={santander} alt="" />
                        <img src={naranja} alt="" />
                        <img src={icbc} alt="" />
                        <img src={ciudad} alt="" />
                        <img src={supervielle} alt="" />
                        <img src={cencosud} alt="" />
                        <img src={patagonia} alt="" />
                    </div>
                </div>
                <div className="payment-pagar">
                <button onClick={handlePayClick}>Pay</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {showPopup && (
                        <div className="popup">
                            <p>Processing payment...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PaymentItem