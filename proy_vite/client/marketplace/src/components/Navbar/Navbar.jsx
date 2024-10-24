import React, { useState , useContext, useEffect } from 'react'
import '../Navbar/Navbar3.css'
import BurgerButtom from '../BurgerButtom/BurgerButtom'
import search from '../../assets/search.svg'
import cart from '../../assets/cart.svg'
import {Link} from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import profile from '../../assets/profile.svg'
import AuthService from '../../services/AuthService'
import LogoutButton from '../Logout Button/LogoutButton'

const Navbar = () => {

    //const {logueado, getTotalCartItems} = useContext(ShopContext)    

    const [clicked, setClicked] = useState(false)
    const [totalCartItems, setTotalCartItems] = useState(0); // Estado para almacenar la cantidad de items
    const { logueado, getTotalCartItems, products} = useContext(ShopContext);

    const handleClick = () => {
        if (clicked) {
            setClicked(false)
        }
        setClicked(!clicked)
    }

    useEffect(() => {
        const fetchTotalCartItems = async () => {
            if (logueado) {
                const itemCount = await getTotalCartItems();
                setTotalCartItems(itemCount);
            } else {
                setTotalCartItems(0);
            }
        };
        
        fetchTotalCartItems();
    }, [logueado, getTotalCartItems]); 


    return(
        <div className='navbar'>
            <div className="left1">
                <h2>Football <span>Kits Arg</span></h2>
            </div>

            <ul className={`nav-menu ${clicked ? 'active' : ''}`}>
                <li > <Link to='/'>Home</Link> </li>
                <li > <Link to='/men'>Men</Link>  </li>
                <li > <Link to='/women'>Women</Link> </li>
                <li > <Link to='/kids'>Kids</Link> </li>
                <li > <Link to='/aboutUs'>About us</Link> </li>
            </ul>

            <div className="right1">
                {/*<div className='search'> <img src= {search} alt="search"/> </div>*/}
                <div className='cart'> 
                    {logueado ? <Link to='/cart'><img src={cart} alt="cart"/></Link> : <Link to='/login'><img src={cart} alt="cart"/></Link>}
                </div>
                <div className='nav-cart-count'> {logueado ? totalCartItems : 0 }</div>
                <div className="profile"> 
                    {logueado ? <Link to='/profile'> <img src={profile} alt="profile" /> </Link> : <></>}
                </div>
                <div className="boton-login">
                    {/*logueado ? <LogoutButton/> : <Link to='/signUp'> <button>Login</button> </Link>*/} 
                    {logueado ? <LogoutButton/> : <Link to='/login'> <button>Login</button> </Link>} 
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
