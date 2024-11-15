import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const CART_BASE_URL = "http://localhost:4002/api";

export const createCart = createAsyncThunk('cart/createCart', async ({ userId, token }) => {
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const { data } = await axios.post(`${CART_BASE_URL}/user/carts/create`, { userId }, header);
    return data;
})

export const getCartById = createAsyncThunk('cart/getCartById', async ({ userId, token }) => {
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const { data } = await axios.get(`${CART_BASE_URL}/user/carts/${userId}`, header);
    return data;
})

export const addProductToCart = createAsyncThunk('cart/addProductToCart', 
    async ({ size, productId, quantity, token }) => {
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const { data } = await axios.post(`${CART_BASE_URL}/user/carts`, 
        { cartId, size, productId, quantity }, header);
    return data;
})

export const removeProductFromCart = createAsyncThunk('cart/removeProductFromCart', 
    async ({ productId, token }, { getState }) => {
    const cartId = getState().cart.cartId;   
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const { data } = await axios.delete(`${CART_BASE_URL}/user/carts/${cartId}/products/${productId}/remove`, header);
    return data;
})

export const clearCart = createAsyncThunk('cart/clearCart', async ({ token }, { getState }) => {
    const cartId = getState().cart.cartId;
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const { data } = await axios.delete(`${CART_BASE_URL}/user/carts/${cartId}/clear`, header);
    return data;
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartId: null,
        cartItems: [],
        totalQuantity: 0,
        error: null,
        userEmail: null,
        discountCode: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCart.fulfilled, (state, action) => {
                state.cartId = action.payload.cartId;
                state.userEmail = action.payload.userEmail;
            })
            .addCase(getCartById.fulfilled, (state, action) => {
                state.cartId = action.payload.cartId;
                state.cartItems = action.payload.cartProducts;
                if (action.payload.discountCode) {
                    state.discountCode = action.payload.discountCode;
                }
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartProducts;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartProducts;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.cartItems = [];
                state.totalQuantity = 0;
            })
    }
});

export default cartSlice.reducer;