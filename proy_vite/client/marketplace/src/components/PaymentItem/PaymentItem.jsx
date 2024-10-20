import React, { useState } from 'react'
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

    return (
        <div className='payment'>
            <div className="payment-container">
                <h1>Medio de pago</h1>
                <div className="payment-fields">
                    <div class="input-container">
                        <input type="text" id='numero_tarjeta' required />
                        <label for="numero_tarjeta">Número de tarjeta</label>
                    </div>
                    <div className="payment-fields-data">
                        <div class="input-container">
                            <input type="text" id='titular' required />
                            <label for="titular">Titular de tarjeta</label>
                        </div>
                        <div class="input-container">
                            <input type="text" id='vencimiento' required />
                            <label for="vencimiento">Vencimiento (MM/DD)</label>
                        </div>
                        <div class="input-container">
                            <input type="text" id='CVV' required />
                            <label for="CVV">CVV</label>
                        </div>
                    </div>
                    <div class="input-container">
                        <input type="text" id="nombre" required/>
                        <label for="nombre">Nombre</label>
                    </div>
                    <div className="cuotas">
                        <select name="cuotas" id="cuotas" onChange={(e) => setCuotas(e.target.value)}>
                            <option value="" disabled selected>Seleccione cantidad de cuotas</option>
                            <option value="1 cuota">1 cuota</option>
                            <option value="3 cuotas">3 cuotas</option>
                            <option value="6 cuotas">6 cuotas</option>
                            <option value="9 cuotas">9 cuotas</option>
                        </select>
                    </div>
                    <div className="datos-titular">
                        <div class="input-container">
                            <input type="text" id="DNI" required/>
                            <label for="DNI">DNI</label>
                        </div>
                        <div class="input-container">
                            <input type="text" id="Telefono" required/>
                            <label for="Telefono">Telefono</label>
                        </div>
                    </div>
                </div>

                <div className="tajetas">
                    <p>Tarjetas aceptadas</p>
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
                    <button>Pagar</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentItem