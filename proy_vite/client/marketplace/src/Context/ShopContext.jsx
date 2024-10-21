import React, { createContext } from 'react';
import { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import AuthService from '../services/AuthService';
import CartService from '../services/CartService';


export const ShopContext = createContext(null);


const ShopContextProvider = (props) =>{
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [cart, setCart] = useState([]);
    const [totalCartAmount, setTotalCartAmount] = useState(0);
    const [totalCartItems, setTotalCartItems] = useState(0);



    const [logueado, setLogueado] = useState(false);
    const changeLogueado = () =>{
        setLogueado(!logueado);
    }

    const signup = async (firstname, lastname, email, password) => {
        try {
            const response = await AuthService.signup(firstname, lastname, email, password);
            console.log('Signup successful');
            setUserId(response.id);
            localStorage.setItem('userId', response.id);
            const carrito = await createCart(response.id);
            setCart(carrito);
            setLogueado(true);
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
            setUserId(response.id);
            localStorage.setItem('userId', response.id);
            const respuesta = await getCartByID();
            if (!respuesta){
                await createCart(response.id);
            }
            setLogueado(true);
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
            localStorage.removeItem('userId');
            setLogueado(false);
            setCart([])
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

    const [cartId, setCartId] = useState(0);
    const createCart = async (userId) => {
        try {
            const response = await CartService.createCart(userId);
            const newCartId = response.cartId;
            setCartId(newCartId);
            localStorage.setItem('cartid', newCartId);
            console.log("Carrito creado, ID: ", newCartId);
        }catch (error){
            console.error("Error crando el carrito: ", error)
        }
    }

    const getCartByID = async () => {
        try {
            const id = localStorage.getItem('userId');
            const response = await CartService.getCartById(id);
            if (response && response.cartProducts) {
                setCart(response.cartProducts);
                console.log("Carrito encontrado: ", response);
                setCartId(response.cartId); // Asegúrate de que también guardas el ID del carrito si se encuentra
                return response;
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
        const cartid = localStorage.getItem('cartid');
        const id = localStorage.getItem('userId');
        if (!cartid || !userId) {
            console.log("Carrito no creado o usuario no logueado");
            return;
        }
        try {
            const response = await CartService.addProductToCart(cartid, productId, size, quantity);
            setCart(response)
        }catch (error){
            console.error("Error agregando producto al carrito: ", error);
        }
    };

    const removeFromCart = async (cartProductId) => {
        const cartid = localStorage.getItem('cartid');
        const id = localStorage.getItem('userId');
        if (!cartid || !id) {
            console.log("Carrito no creado o usuario no logueado");
            return;
        }
        try {
            const response = await CartService.removeProduct(cartid, cartProductId);
            await getCartByID(userId);
        }catch (error){
            console.error("Error eliminando producto del carrito: ", error);
        }
        
    };

    const clearCart = async() => {
        const cartid = localStorage.getItem('cartid');
        const id = localStorage.getItem('userId');
        if (!cartid || !id) {
            console.log("Carrito no creado o usuario no logueado");
            return;
        }
        try {
            const response = await CartService.clearCart(cartid);
            await getCartByID(userId);
        }catch (error){
            console.error("Error limpiando el carrito: ", error);
        }
        
    };
    
    const getTotalCartAmount = async () => {
        const cartid = localStorage.getItem('cartid');
        try {
            const response = await CartService.getTotal(cartid);
            console.log("Total del carrito: ", response);
            return response;
        } catch (error) {
            console.error("Error obteniendo el total del carrito: ", error);
            return Infinity;
        }
    };

    const getTotalCartItems = async () => {
        const cartid = localStorage.getItem('cartid');
        try {
            const response = await CartService.getItemCount(cartid);
            return response;
        }catch (error){
            console.error("Error obteniendo la cantidad de items del carrito: ", error);
            return 0;
        }
        
    }

    const contextValue = { 
        getTotalCartAmount,
        getTotalCartItems,
        getCartByID,
        products, 
        cart, 
        addToCart, 
        removeFromCart,
        logueado, 
        changeLogueado, 
        clearCart,
        signup,
        login,
        logout,
        setLoading
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {loading ? <p>Loading...</p> : props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;