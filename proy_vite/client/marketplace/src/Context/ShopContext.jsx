import React, { createContext } from 'react';
import { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import AuthService from '../services/AuthService';
import CartService from '../services/CartService';


export const ShopContext = createContext(null);


const ShopContextProvider = (props) =>{
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    const [logueado, setLogueado] = useState(false);
    const changeLogueado = () =>{
        setLogueado(!logueado);
    }

    const signup = async (firstname, lastname, email, password) => {
        try {
            const response = await AuthService.signup(firstname, lastname, email, password);
            console.log('Signup successful');
            setUserId(response.userId);
            setLogueado(true);
            await createCart(response.userId);
            return response;
        }catch (error){
            console.error('Failed signup: ', error);
            throw new Error('Signup failed');
        }
    }

    const login = async (email, password) => {
        try {
            const response = await AuthService.login(email, password);
            console.log('Succesful login')
            setUserId(response.userId);
            setLogueado(true);
            await getCartByID();
            return response;
        }catch (error){
            console.error('Failed login: ', error);
            throw new Error('The email address or password is incorrect.');
        }
    }

    const logout = async () => {
        try {
            AuthService.logout();
            setUserId(null);
            setLogueado(false);
            clearCart();
            console.log('Logout successful');
        }catch (error) {
            console.error('Failed logout: ', error);
        }
    }

    const [products, setProducts] = useState([]);
    useEffect( () => {
        ProductService.getAllProducts().then(response => {
            setProducts(response.data);
            console.log(response.data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        })
    },[])

    const [cartId, setCartId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const createCart = async (userId) => {
        try {
            const response = await CartService.createCart(userId);
            const newCartId = response.data.cartId;
            setCartId(newCartId);
            console.log("Carrito creado, ID: ", newCartId);
        }catch (error){
            console.error("Error crando el carrito: ", error)
        }
    }

    const getCartByID = async () => {
        try {
            const response = await CartService.getCartById(userId);
            if (response.data && response.data.products) {
                setCartItems(response.data.products);
                setCartId(response.data.cartId); // Asegúrate de que también guardas el ID del carrito si se encuentra
            } else {
                console.log("No se encontró un carrito existente, creando uno nuevo...");
                await createCart(userId);  // Si no hay carrito, lo creamos
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Si el error es que no se encontró el carrito (404), creamos uno
                console.log("Carrito no encontrado, creando uno nuevo...");
                await createCart(userId);
            } else {
                console.error("Error obteniendo el carrito: ", error);
            }
        }
    };

    const addToCart = async (productId, size, quantity) => {
        if (!cartId || !userId) {
            console.log("Carrito no creado o usuario no logueado");
            return;
        }
        try {
            const response = await CartService.addProductToCart(cartId, productId, size, quantity);
            await getCartByID(userId);
        }catch (error){
            console.error("Error agregando producto al carrito: ", error);
        }
    };

    const removeFromCart = async (productId,size) => {
        if (!cartId || !userId) {
            console.log("Carrito no creado o usuario no logueado");
            return;
        }
        try {
            const response = await CartService.removeProduct(cartId, productId, size);
            await getCartByID(userId);
        }catch (error){
            console.error("Error eliminando producto del carrito: ", error);
        }
        
    };

    const clearCart = async() => {
        if (!cartId || !userId) {
            console.log("Carrito no creado o usuario no logueado");
            return;
        }
        try {
            const response = await CartService.clearCart(cartId);
            await getCartByID(userId);
        }catch (error){
            console.error("Error limpiando el carrito: ", error);
        }
        
    };
    
    const getTotalCartAmount = async () => {
        try {
            const response = await CartService.getTotal(cartId);
            return response.data.total;
        }catch (error){
            console.error("Error obteniendo el total del carrito: ", error);
            return 0;
        }
    }

    const getTotalCartItems = async (cartId) => {
        try {
            const response = await CartService.getItemCount(cartId);
            return response.data.itemCount;
        }catch (error){
            console.error("Error obteniendo la cantidad de items del carrito: ", error);
            return 0;
        }
        
    }

    const contextValue = { 
        getTotalCartItems, 
        getTotalCartAmount, 
        products, 
        cartItems, 
        addToCart, 
        removeFromCart,
        logueado, 
        changeLogueado, 
        clearCart,
        signup,
        login,
        logout
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {loading ? <p>Loading...</p> : props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;