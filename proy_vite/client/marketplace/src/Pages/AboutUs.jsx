import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import LogoutButton from '../components/Logout Button/LogoutButton'
import { ShopContext } from '../Context/ShopContext'



const AboutUs =() => {
    
    const{logueado} = useContext(ShopContext)

    return(
    <div>
        <h1>AboutUs</h1>
        <p>
        Somos un equipo de estudiantes apasionados por el fútbol que estamos desarrollando este proyecto 
        en el marco de la materia Aplicaciones Interactivas de la Universidad Argentina de la Empresa (UADE).
        Nuestro objetivo es brindar a los fanáticos de este deporte la posibilidad de adquirir las mejores camisetas de sus equipos favoritos,
        con la comodidad de una plataforma digital ágil y segura
        El trabajo fue desarrollado por los estudiantes: Rocco Dell Amico, Nicolas Estepañuk y Nicolas Hernandez

        Insertar foto aca 
        </p>
        <Link to='/admin'><button> continuar</button> </Link>
        <LogoutButton/>
    </div>
    )
}

export default AboutUs