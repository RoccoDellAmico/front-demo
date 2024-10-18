import axios from 'axios'

const AUTH_BASE_URL = "http://localhost:4002/api/v1/auth"

class AuthService {

    async login(email, password){
        try {
            const response = await axios.post(AUTH_BASE_URL + "/authenticate", { email, password })
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
            }
            return response.data
        } catch (error) {
            throw new Error('Login failed')
        }
    }

    async signup(firstname, lastname, email, password){
        try{
            const response = await axios.post(AUTH_BASE_URL + "/register", { firstname, lastname, email, password })
            if(response.data.token){
                localStorage.setItem('token', response.data.token)
            }
            return response.data
        } catch (error) {
            throw new Error('Signup failed')
        }
    }

    logout(){
        axios.post("http://localhost:4002/api/user/logout", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        localStorage.removeItem('token')
    }

}

export default new AuthService()
