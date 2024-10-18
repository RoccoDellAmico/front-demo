import React, { useContext } from 'react'
import LogoutButton from '../components/Logout Button/LogoutButton'
import { ShopContext } from '../Context/ShopContext'

const AboutUs =() => {
    
    const{logueado} = useContext(ShopContext)

    return(
    <div>
        <h1>AboutUs</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere voluptatem id ipsa nemo rem ex molestias, accusantium, laudantium delectus voluptatibus iste, atque a ut dolores quibusdam labore corrupti cumque eum.</p>
        <LogoutButton/>
    </div>
    )
}

export default AboutUs