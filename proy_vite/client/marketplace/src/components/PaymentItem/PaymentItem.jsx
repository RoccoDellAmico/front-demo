import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
//import { ShopContext } from '../../Context/ShopContext';
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
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../redux/OrderSlice";
import { clearCart } from "../../redux/CartSlice";




const PaymentItem = () => {

    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [titular, setTitular] = useState('');
    const [vencimiento, setVencimiento] = useState('');
    const [cvv, setCvv] = useState('');
    const [nombre, setNombre] = useState('');
    const [cuotas, setCuotas] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { cartId } = useSelector((state) => state.cart);

    const handlePayClick = (e) => {
        if (!numeroTarjeta || !titular || !vencimiento || !cvv || !nombre || !cuotas || !dni || !telefono) {
            e.preventDefault();
            setErrorMessage('Please complete all fields');
            setShowPopup(false);
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        } else {
            setErrorMessage('');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                dispatch(clearCart({ token }));
                navigate('/');
            }, 2000);
            dispatch(placeOrder({ cartId, token }));
        }
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
                value={numeroTarjeta}
                onChange={(e) => setNumeroTarjeta(e.target.value)}
                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} 
            />
            <label htmlFor="numero_tarjeta">Card number</label>
            </div>
                    <div className="payment-fields-data">
                        <div className="input-container">
                            <input type="text" id='titular' required maxLength={50} value={titular} onChange={(e) => setTitular(e.target.value)} onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')}/>
                            <label htmlFor="titular">Card owner</label>
                        </div>
                        <div className="input-container">
                            <input 
                                type="text" 
                                id="vencimiento" 
                                required 
                                className="no-spinner" 
                                maxLength={5} 
                                value={vencimiento}
                                onChange={(e) => setVencimiento(e.target.value)}
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
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} 
                            />
                            <label htmlFor="CVV">Security code</label>
                        </div>
                    </div>
                    <div className="input-container">
                        <input type="text" id="nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')}/>
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
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
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
                                maxLength={30} 
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
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
    );
};

export default PaymentItem