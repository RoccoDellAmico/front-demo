import { Navigate, useNavigate } from "react-router-dom"
import AuthService from "../../services/AuthService"


const LogoutButton = ()=> {
    const navigate = useNavigate();

    const handleClick = () => {
        AuthService.logout()
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
        <div>
            <button type="button" onClick={handleClick}>logout</button>
        </div>
    )
}

export default LogoutButton