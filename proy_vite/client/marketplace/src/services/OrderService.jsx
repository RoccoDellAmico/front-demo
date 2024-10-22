import axios from "axios";
import React from "react";

const ORDER_BASE_URL = "http://localhost:4002/api"

class OrderService {

    async getOrdersById(userId) {
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
            const response = await axios.get(`${ORDER_BASE_URL}/user/orders/${userId}`, config);
            return response.data;  
        }catch(error) {
            console.error("Error getting orders", error);
            throw error;
        }
    }

    async getOrders() {
        try{
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,  // Añadir el token en el encabezado
                }
            };
            const response = await axios.delete(`${ORDER_BASE_URL}/admin/orders`, config);
            return response.data;  
        }catch(error){
            console.error("Error getting orders by id", error);
            throw error;
        }
    }

    async placeOrder(cartId) {
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
            const response = await axios.delete(`${ORDER_BASE_URL}/user/placeOrder/${cartId}`, config);
            return response.data;  
        }catch(error){
            console.error("Error placing order", error);
            throw error;
        }
    }
}

export default new OrderService();