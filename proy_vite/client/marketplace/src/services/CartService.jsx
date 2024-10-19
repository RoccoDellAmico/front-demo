import axios from "axios";
import React from "react";

const CART_BASE_URL = "http://localhost:4002/api"

class CartService {

    async getCartsAdmin() {
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
            const response = await axios.get(`${CART_BASE_URL}/admin/carts`, config);
            return response;  
        }catch(error){
            console.error("Error fetching carts", error);
            throw error;
        }
    }
}

export default new CartService();