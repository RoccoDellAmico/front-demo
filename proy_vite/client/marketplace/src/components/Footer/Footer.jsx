import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import AboutUs from '../../Pages/AboutUs';
import Instagram from '../../assets/instagram.svg';
import WhatsApp from '../../assets/whatsapp.svg';
import Pinterest from '../../assets/pinterest.svg';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                {/*<h2>Navbar <span>Responsive</span></h2> Comento esto del footer*/}
            </div>
            <div className="footer-links">
                <Link to='/aboutUs'>About us</Link>
            </div>
            <div className='footer-social-icon'>
                <div className="footer-icon-container">
                    <img src={Instagram} alt="instagram-logo"/>
                </div>
                <div className="footer-icon-container">
                    <img src={WhatsApp} alt="whatsApp-logo"/>
                </div>
                <div className="footer-icon-container">
                    <img src={Pinterest} alt="pinterest-logo"/>
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>Copyright © 2024 Marketplace - All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;