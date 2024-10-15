/*import React, { useEffect } from "react";
import './NavbarEjemplo.css'

const NavbarEjemplo = () => {

    useEffect(() => {
        const toggleBtn = document.querySelector('.toggle_btn');
        const toggleBtnIcon = document.querySelector('.toggle_btn i');
        const dropDownMenu = document.querySelector('.dropdown_menu');

        const handleToggle = () => {
            dropDownMenu.classList.toggle('open');
            const isOpen = dropDownMenu.classList.contains('open');

            toggleBtnIcon.className = isOpen 
                ? 'fa-solid fa-xmark' 
                : 'fa-solid fa-bars';
        };

        if (toggleBtn) {
            toggleBtn.onclick = handleToggle;
        }

        // Cleanup function to avoid memory leaks
        return () => {
            if (toggleBtn) {
                toggleBtn.onclick = null; // Remove the event listener on unmount
            }
        };
    }, []); // El array vacío asegura que esto se ejecute solo al montar

    return (
        <header>
            <div className="navbar">
                <div className="logo"> <a href="#">Football Kits</a> </div>
                <ul className="links">
                    <li><a href="hero">Home</a></li>
                    <li><a href="men">Men</a></li>
                    <li><a href="woman">Women</a></li>
                    <li><a href="kids">Kids</a></li>
                    <li><a href="aboutUs">About Us</a></li>
                </ul>
                <a href="#" className="action_btn">Get Started</a>
                <div className="toggle_btn">
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>

            <div className="dropdown_menu open">
                <li><a href="hero">Home</a></li>
                <li><a href="men">Men</a></li>
                <li><a href="woman">Women</a></li>
                <li><a href="kids">Kids</a></li>
                <li><a href="aboutUs">About Us</a></li>
                <li><a href="#" className="action_btn">Get Started</a></li>
            </div>

        </header>
    )
}

export default NavbarEjemplo;*/