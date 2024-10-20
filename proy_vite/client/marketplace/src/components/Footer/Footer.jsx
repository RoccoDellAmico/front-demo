import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import AboutUs from '../../Pages/AboutUs';
import Instagram from '../../assets/instagram.svg';
import WhatsApp from '../../assets/whatsapp.svg';
import Pinterest from '../../assets/pinterest.svg';
import Facebook from '../../assets/facebook.svg';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <h2>Football <span>Kits</span></h2>
            </div>
            <div className="footer-links">
                <Link to='/'>Home</Link>
                <Link to='/aboutUs'>About us</Link>
            </div>
            <div className='footer-social-icon'>
                <div className="footer-icon-container">
                    <a href="https://www.instagram.com/uadeoficial/?hl=es" target='_blank'> <img src={Instagram} alt="instagram-logo"/> </a>
                </div>
                <div className="footer-icon-container">
                    <a href="https://api.whatsapp.com/send?phone=5491176625199" target='_blank'> <img src={WhatsApp} alt="whatsApp-logo"/> </a>
                </div>
                <div className="footer-icon-container">
                    <a href="https://es.pinterest.com/ideas/uade-universidad/900479367944/" target='_blank'> <img src={Pinterest} alt="pinterest-logo"/> </a>
                </div>
                <div className="footer-icon-container">
                    <a href="https://www.facebook.com/UADEOficial/?locale=es_LA" target='_blank'> <img src={Facebook} alt="facebook-logo" /></a>
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>Copyright © 2024 Football Kits Arg - All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;