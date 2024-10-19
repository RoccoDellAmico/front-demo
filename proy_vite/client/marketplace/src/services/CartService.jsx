import axios from "axios";
import React from "react";

const CART_BASE_URL = "http://localhost:4002/api"

class CartService {

    async createCart(email) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            const response = await axios.post(`${CART_BASE_URL}/user/carts/${email}`, null, config);
            return response;
        } catch (error) {
            console.error("Error creating cart", error);
            throw error;
        }
    }

    async getCartById(userId) {
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
            const response = await axios.get(`${CART_BASE_URL}/user/carts/${userId}`, config);
            return response; 
        } catch(error){
            console.error("Error fetching cart", error);
            throw error;
        }
    }

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

    async addProductToCart(){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            const body = {
                cartId: cartId,
                productId: productId,
                size: size,
                quantity: quantity
            }

            const response = await axios.put(`${CART_BASE_URL}/user/carts`, body, config);
            return response;
        } catch (error) {
            console.error("Error adding product to cart", error);
            throw error;
        }
    }

    async addOneProduct(cartId, productId, size){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            const response = await axios.put(`${CART_BASE_URL}/user/carts/${cartId}/products/${productId}/${size}/addOne`, null, config);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error("Error adding one product to cart", error);
            throw error;
        }
    }

    async substractOneProduct(cartId, productId, size){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            const response = await axios.put(`${CART_BASE_URL}/user/carts/${cartId}/products/${productId}/${size}/substractOne`, null, config);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error("Error subtracting one product to cart", error);
            throw error;
        }
    }

    async clearCart(cartId){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            const response = await axios.put(`${CART_BASE_URL}/user/carts/${cartId}/clear`, null, config);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error("Error clearing cart", error);
            throw error;
        }
    }

    async getTotal(cartId){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            const response = await axios.get(`${CART_BASE_URL}/user/carts/${cartId}/getTotal`, null, config);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error("Error getting total cart", error);
            throw error;
        }
    }

    async getItemCount(cartId){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            const response = await axios.get(`${CART_BASE_URL}/user/carts/${cartId}/itemCount`, null, config);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error("Error getting item count of cart", error);
            throw error;
        }
    }

    async getCartProducts(cartId){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            const response = await axios.put(`${CART_BASE_URL}/user/carts/${cartId}/cartProducts`, null, config);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error("Error getting cart products", error);
            throw error;
        }
    }

    async addDiscountCode(cartId, discountCode){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            const response = await axios.put(`${CART_BASE_URL}/user/carts/add-discount/${discountCode}/cart/${cartId}`, null, config);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error("Error getting cart products", error);
            throw error;
        }
    }
}

export default new CartService();