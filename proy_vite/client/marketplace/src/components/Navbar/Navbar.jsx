import React, {useState} from 'react'
import '../Navbar/Navbar.css'
import BurgerButtom from '../BurgerButtom/BurgerButtom'
import search from '../../assets/search.svg'
import cart from '../../assets/cart.svg'

const Navbar = () => {

    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }

    return(
        <header className='header'>
            <div className="left1">
                <h2>Navbar <span>Responsive</span></h2>
            </div>

            <div className="middle">
                <div className={`links ${clicked ? 'active' : ''}`}>
                    <a onClick={handleClick} href="#">Home</a>
                    <a onClick={handleClick} href="#">Men</a>
                    <a onClick={handleClick} href="#">Women</a>
                    <a onClick={handleClick} href="#">Kids</a>
                    <a onClick={handleClick} href="#">About us</a>
                </div>
            </div>

            <div className="right1">
                <div className='search'> <img src= {search} alt="search"/> </div>
                <div className='cart'> <img src={cart} alt="cart"/> </div>
            </div>
            <div className='burger'>
            <   BurgerButtom clicked={clicked} handleClick={handleClick} />
            </div>
            <div className={`bg-div ${clicked ? 'active' : ''}`}></div>
        </header>
    )
}

export default Navbar
