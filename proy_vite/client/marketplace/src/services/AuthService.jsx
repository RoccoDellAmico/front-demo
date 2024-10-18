import React from 'react'
import axios from 'axios'
import { useContext } from 'react'

const AUTH_BASE_URL = "http://localhost:4002/api/v1/auth"

class AuthService {

    async login(email, password){
        try {
            const response = await axios.post(AUTH_BASE_URL + "/authenticate", { email, password })
            /*if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                console.log('token creado ' + response.data.token);
            }*/
                localStorage.setItem('token', response.data.access_token)
                console.log('token creado ' + response.data.access_token);
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
        /*axios.post("http://localhost:4002/api/user/logout", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })*/
        let token = localStorage.getItem('token');
        axios.post("http://localhost:4002/api/user/logout/2", { token: token }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        });
        console.log('token eliminado ' + token);
        localStorage.removeItem('token');
        console.log('token despues de eliminar ' + localStorage.getItem('token'))
    }
}

export default new AuthService()
