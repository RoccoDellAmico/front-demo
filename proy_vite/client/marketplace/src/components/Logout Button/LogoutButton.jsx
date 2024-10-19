import { Navigate, useNavigate} from "react-router-dom"
import AuthService from "../../services/AuthService"
import { ShopContext } from '../../Context/ShopContext'
import React, {useContext} from "react"
import './LogoutButton.css'


const LogoutButton = ()=> {
    const navigate = useNavigate();
    const {changeLogueado} = useContext(ShopContext);

    const handleClick = () => {
        AuthService.logout()
        changeLogueado();
        navigate('/')
        console.log('logout');
    }

        /*async function logout() {
                try {
                const response = await fetch('http://localhost:4002/api/user/logout/2', {
                    method: 'POST',
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        token: localStorage.getItem('token')})
                });
              
                localStorage.removeItem('token');
                navigate('/')
                if (!response.ok) {
                    // Logout successful
                    console.error('Logout failed:', response.statusText);
                    // Redirect to login page or perform other actions
                } 
            }catch (error) {
              console.error('Error during logout:', error);
            }
          }*/

    return(
        <div className="logout-button">
            <button type="button" onClick={handleClick}>Logout</button>
        </div>
    )
}

export default LogoutButton