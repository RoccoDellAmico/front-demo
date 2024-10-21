import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'

const AUTH_BASE_URL = "http://localhost:4002/api/v1/auth"

class AuthService {

    async login(email, password){
        try {
            const response = await axios.post(AUTH_BASE_URL + "/authenticate", { email, password })
            /*if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                console.log('token creado ' + response.data.token);
            }*/
            localStorage.setItem('token', response.data.access_token);                
            return response.data
        } catch (error) {
            throw new Error('Login failed')
        }
    }

    async signup(firstname, lastname, email, password){
        try{
            const response = await axios.post(AUTH_BASE_URL + "/register", { firstname, lastname, email, password })
            if(response.data.access_token){
                localStorage.setItem('token', response.data.access_token)
            }
            return response.data
        } catch (error) {
            throw new Error('Signup failed')
        }
    }

    async logout(){
        let token = localStorage.getItem('token');
        try {
            await axios.post("http://localhost:4002/api/user/logout/2", { token: token }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
            console.log('Logout successful');
        }catch (error) {
            console.error('Logout failed', error);
            throw new Error('Logout failed');
        }
    }
}


export default new AuthService();
