import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import LogoutButton from '../components/Logout Button/LogoutButton'
import { ShopContext } from '../Context/ShopContext'
import Payment from './Payment'
import './CSS/AboutUs.css'


const AboutUs =() => {
    
    const{logueado} = useContext(ShopContext)

    return (
        <div className="aboutus">
            <div className="aboutus-container">
                <h1>About Us</h1>
                <p>
                    We are a team of passionate football enthusiasts developing this project as part of the Interactive Applications course 
                    at the Argentine University of Enterprise (UADE). 
                    Our goal is to provide football fans with the opportunity to purchase the best jerseys of their favorite teams through a 
                    fast and secure digital platform. This project was developed by students: Rocco Dell Amico, Nicolas Estepañuk, and Nicolas Hernandez.
                </p>
                {/*<div className="button-container">
                    <Link to='/admin'><button>Continuar</button></Link>
                    <LogoutButton />
                    <Link to='/payment'><Payment />Payment</Link>
                </div>*/}
            </div>
        </div>
    )
}

export default AboutUs