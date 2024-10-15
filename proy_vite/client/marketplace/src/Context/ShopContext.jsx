import React, { createContext } from 'react';
import { useState, useEffect } from 'react';


export const ShopContext = createContext(null);

const getDefaultCart = (length) => {
    let cart = {};
    for (let index = 0; index < length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) =>{
    const [all_product, setAllProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState({});                    // CUANDO USEMOS LA BD SE SACA ESTA PARTE DEL CODIGO

    useEffect(()=>{
        //fetch('https://dummyjson.com/products') //localhost:8080/products API backend
        //fetch('https://fakestoreapi.com/products')
        fetch('https://fakestoreapiserver.reactbd.com/products')
        .then((response) => response.json())
        .then((data) => {
            setAllProduct(data); //Actualizamos el estado con los datos obtenidos
            setLoading(false); //Cambiamos el estado de loading
        })
        .catch((error) => {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        })
    }, [])

    // Establecer el carrito por defecto una vez que all_product se haya actualizado
    useEffect(() => {
        if (all_product.length) {
            setCartItems(getDefaultCart(all_product.length)); // Configura carrito
        }
    }, [all_product]); // Se activa cuando all_product cambia

    if(loading){
        return <p>Loading...</p>
    }

    //const [cartItems,setcartItems] = useState(getDefaultCart()); // CUANDO USEMOS LA BD SE PONE ESTA PARTE DEL CODIGO

    /*const addToCart = (itemId) => {
        setCartItems((prev) => ( {...prev, [itemId]: (prev[itemId] || 0) + 1}));
        console.log(itemId)
        console.log(cartItems[itemId]);
        console.log(cartItems);
    };*/

    const addToCart = (itemId, callback) => {
        setCartItems((prev) => {
            const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            if (callback) callback();
            return newCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ( { ...prev, [itemId]: Math.max(0, (prev[itemId] || 0) - 1)}));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = all_product.find( (product) => product._id === Number(item))
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for ( const item in cartItems) {
            if(cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;