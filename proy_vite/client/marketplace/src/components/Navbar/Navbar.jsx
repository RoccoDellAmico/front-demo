import React, { useState , useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../Navbar/Navbar.css'
import BurgerButtom from '../BurgerButtom/BurgerButtom'
import cart from '../../assets/cart.svg'
import {Link} from 'react-router-dom'
import profile from '../../assets/profile.svg'
import LogoutButton from '../Logout Button/LogoutButton'

const Navbar = () => {  

    const [clicked, setClicked] = useState(false)
    const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);
    const { totalQuantity } = useSelector((state) => state.cart);

    const handleClick = () => {
        if (clicked) {
            setClicked(false)
        }
        setClicked(!clicked)
    }

    return(
        <div className='navbar'>
            <div className="left1">
                <h2>Football <span>Kits Arg</span></h2>
            </div>

            <ul className={`nav-menu ${clicked ? 'active' : ''}`}>
                {!isAdmin && ( 
                <> 
                    <li > <Link to='/'>Home</Link> </li>
                    <li > <Link to='/men'>Men</Link>  </li>
                    <li > <Link to='/women'>Women</Link> </li>
                    <li > <Link to='/kids'>Kids</Link> </li>
                    <li > <Link to='/aboutUs'>About us</Link> </li>
                </>)}
            </ul>

            <div className="right1">
                {!isAdmin && (
                    <>
                        <div className='cart'>
                            {isAuthenticated ? <Link to='/cart'><img src={cart} alt="cart" /></Link> : <Link to='/login'><img src={cart} alt="cart" /></Link>}
                        </div>
                        <div className='nav-cart-count'>{isAuthenticated ? totalQuantity : 0}</div>
                        <div className="profile">
                            {isAuthenticated ? <Link to='/profile'><img src={profile} alt="profile" /></Link> : <></>}
                        </div>
                    </>
                )}
                <div className="boton-login">
                    {isAuthenticated ? <LogoutButton/> : <Link to='/login'> <button>Login</button> </Link>} 
                </div>
            </div>

            <div className='burger'>
                <BurgerButtom clicked={clicked} handleClick={handleClick} />
            </div>
            <div className={`bg-div ${clicked ? 'active' : ''}`}></div>
        </div>
    )
}

export default Navbar
