import React, { useState , useContext } from 'react'
import '../Navbar/Navbar3.css'
import BurgerButtom from '../BurgerButtom/BurgerButtom'
import search from '../../assets/search.svg'
import cart from '../../assets/cart.svg'
import {Link} from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import profile from '../../assets/profile.svg'

const Navbar = () => {


    const {logeado} = useContext(ShopContext)

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
                <h2>Football <span>Kits</span></h2>
            </div>

            <ul className={`nav-menu ${clicked ? 'active' : ''}`}>
                <li > <Link to='/'>Home</Link> </li>
                <li > <Link to='/men'>Men</Link>  </li>
                <li > <Link to='/women'>Women</Link> </li>
                <li > <Link to='/kids'>Kids</Link> </li>
                <li > <Link to='/aboutUs'>About us</Link> </li>
            </ul>

            <div className="right1">



                <div className='search'> <img src= {search} alt="search"/> </div>
                <div className='cart'> 
                    {logeado ? <Link to='/cart'><img src={cart} alt="cart"/></Link> : <Link to='/signUp'><img src={cart} alt="cart"/></Link>}
                </div>
                <div className='nav-cart-count'> {getTotalCartItems()} </div>
                <div className="profile"> 
                    {logeado ? <Link to='/profile'> <img src={profile} alt="profile" /> </Link> : <></>}
                </div>
                <div className="boton-login">
                    {logeado ? <Link to='/signUp'> <button>Logout</button> </Link> : <Link to='/signUp'> <button>Login</button> </Link>} 
                </div>
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