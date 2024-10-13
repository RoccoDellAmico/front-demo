import React, { useState , useContext } from 'react'
import '../Navbar/Navbar.css'
import BurgerButtom from '../BurgerButtom/BurgerButtom'
import search from '../../assets/search.svg'
import cart from '../../assets/cart.svg'
import {Link} from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

    const [clicked, setClicked] = useState(false)
    const [menu, setMenu] = useState("home");

    const handleClick = () => {
        if (clicked) {
            setClicked(false)
        }
        setClicked(!clicked)
    }

    const {getTotalCartItems} = useContext(ShopContext);

    return(
        <div className='navbar'>
            <div className="left1">
                <h2>Navbar <span>Responsive</span></h2>
            </div>
            <div>
                <ul className='nav-menu'>
                    <div className={`links ${clicked ? 'active' : ''}`}>
                        <li onClick={ () => {setMenu("home")} } > <Link to='/'>Home</Link> {menu === "home" && <hr />} </li>
                        <li onClick={ () => {setMenu("men")} } > <Link to='/men'>Men</Link> {menu === "men" && <hr />} </li>
                        <li onClick={ () => {setMenu("women")} } > <Link to='/women'>Women</Link> {menu === "women" && <hr />} </li>
                        <li onClick={ () => {setMenu("kids")} } > <Link to='/kids'>Kids</Link> {menu === "kids" && <hr />} </li>
                        <li onClick={ () => {setMenu("aboutUs")} } > <Link to='/aboutUs'>About us</Link> {menu === "aboutUs" && <hr />} </li>
                    </div>
                </ul>
            </div>

            <div className="right1">

                <div className='search'> <img src= {search} alt="search"/> </div>
                <div className='cart'> 
                    <Link to='/cart'><img src={cart} alt="cart"/></Link>
                </div>
                <div className='nav-cart-count'> {getTotalCartItems()} </div>
                <Link to='/login'> <button>Login</button> </Link>
            </div>

            <div className='burger'>
            <   BurgerButtom clicked={clicked} handleClick={handleClick} />
            </div>
            <div className={`bg-div ${clicked ? 'active' : ''}`}></div>
        </div>
    )
}

export default Navbar

/*
<Link to='/men'>Men</Link>
                        <Link to='/women'>Women</Link>
                        <Link to='/kids'>Kids</Link>
                        <Link to='/aboutUs'>About us</Link>*/