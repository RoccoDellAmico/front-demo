import axios from "axios";
import React from "react";

const USER_BASE_URL = "http://localhost:4002/api"

class UserService {

    async getUsers() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,  // Añadir el token en el encabezado
                }
            };
            const response = await axios.get(`${USER_BASE_URL}/admin/users`, config);
            return response;  
        }catch(error){
            console.error("Error fetching users", error);
            throw error;
        }
    }
}

export default new UserService();
