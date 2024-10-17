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

    const [dropdown,setDropdown] = useState(false);

    const opencloseDropdown = () => {
        setDropdown(!dropdown);
    }

    return (
        <div className='payment'>
            <div className="payment-container">
                <h1>Medio de pago</h1>
                <div className="payment-fields">
                    <input type="text" placeholder='Número de tarjeta' />
                    <div className="payment-fields-data">
                        <input type="text" placeholder='Titular de tarjeta' />
                        <input type="text" placeholder='Vencimiento (MM/DD)' />
                        <input type="text" placeholder='CVV' />
                    </div>
                    <div className="dropdown">
                        <Dropdown isOpen={dropdown} toggle={opencloseDropdown}>
                            <DropdownToggle caret>
                                Cuotas
                            </DropdownToggle>
                            
                            <DropdownMenu>
                                <DropdownItem header>Seleccione cuotas</DropdownItem>
                                <DropdownItem>1 cuota</DropdownItem>
                                <DropdownItem>3 cuota</DropdownItem>
                                <DropdownItem>6 cuota</DropdownItem>
                                <DropdownItem>9 cuota</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="datos-titular">
                        <input type="text" placeholder='DNI' />
                        <input type="text" placeholder='Telefono'/>
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