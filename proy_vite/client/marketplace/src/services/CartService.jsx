import axios from "axios";
import React from "react";

const CART_BASE_URL = "http://localhost:4002/api"

class CartService {

    async createCart(userId) {
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
            const body = {userId}
            const response = await axios.post(`${CART_BASE_URL}/user/carts/create`, body, config);
            return response.data;
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
            console.log(userId)
            const response = await axios.get(`${CART_BASE_URL}/user/carts/${userId}`, config);
            console.log('cartservice',response.data)
            return response.data; 
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
            return response.data;  
        }catch(error){
            console.error("Error fetching carts", error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, size, quantity) {
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
                cartId : cartId, 
                size : size,
                productId : productId, 
                quantity : quantity };

            const response = await axios.put(`${CART_BASE_URL}/user/carts`, body, config);
            return response.data;
        } catch (error) {
            console.error("Error adding product to cart", error);
            alert("No hay stock suficiente para la cantidad solicitada.");
            return false;
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
    
            const response = await axios.put(`${CART_BASE_URL}/user/carts/${cartId}/products/${productId}/${size}/addOne`, config);
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
    
            const response = await axios.put(`${CART_BASE_URL}/user/carts/${cartId}/products/${productId}/${size}/substractOne`, config);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error("Error subtracting one product to cart", error);
            throw error;
        }
    }

    async updateProductQuantity(cartId, cartProductId, quantity){
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
            console.log("Updating product quantity with cartId:", cartId, "and cartProductId:", cartProductId, "and quantity:", quantity);
            const response = await axios.delete(`${CART_BASE_URL}/user/carts/${cartId}/products/${cartProductId}/quantity/${quantity}/update`, config);
            console.log("Product quantity updated CARTSERVICE", response);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("No hay stock suficiente para la cantidad solicitada.");
            }
            console.error("Error updating product quantity", error);
            throw error;
        }
    }

    async removeProduct(cartId, cartProductId){
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

            console.log("Removing product with cartId:", cartId, "and cartProductId:", cartProductId);
    
            const response = await axios.delete(`${CART_BASE_URL}/user/carts/${cartId}/products/${cartProductId}/remove`, config);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error("Error removing one product to cart", error);
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
    
            const response = await axios.delete(`${CART_BASE_URL}/user/carts/${cartId}/clear`, config);
            console.log("Cart cleared CARTSERVICE", response);
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
    
            const response = await axios.get(`${CART_BASE_URL}/user/carts/${cartId}/getTotal`, config);
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
    
            const response = await axios.get(`${CART_BASE_URL}/user/carts/${cartId}/itemCount`, config);
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
    
            const response = await axios.get(`${CART_BASE_URL}/user/carts/${cartId}/cartProducts`, config);
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
    
            const response = await axios.delete(`${CART_BASE_URL}/user/carts/add-discount/${discountCode}/cart/${cartId}`, config);
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error("Error getting cart products", error);
            throw error;
        }
    }
}

export default new CartService();