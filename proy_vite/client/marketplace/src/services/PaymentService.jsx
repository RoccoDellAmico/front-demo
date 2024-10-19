import axios from "axios";
import React from "react";

const PAYMENT_BASE_URL = "http://localhost:4002/api"

class PaymentService {

    async getPaymentAdmin() {
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
            const response = await axios.get(`${PAYMENT_BASE_URL}/admin/payments`, config);
            return response;  
        }catch(error){
            console.error("Error fetching payment", error);
            throw error;
        }
    }
}

export default new PaymentService();