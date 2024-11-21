import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const CART_BASE_URL = "http://localhost:4002/api";

export const createCart = createAsyncThunk('cart/createCart', async ({ id, token }) => {
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const body = { userId : id};
    const { data } = await axios.post(`${CART_BASE_URL}/user/carts/create`, body, header);
    return data;
})

export const getCartById = createAsyncThunk('cart/getCartById', async ({ id, token }) => {
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const { data } = await axios.get(`${CART_BASE_URL}/user/carts/${id}`, header);
    console.log(data)
    return data;
})

export const addProductToCart = createAsyncThunk('cart/addProductToCart', 
    async ({ size, productId, quantity, token }, { getState }) => {
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const cartId = getState().cart.cartId;
    console.log(cartId) // DELETE CONSOLE.LOG
    const { data } = await axios.put(`${CART_BASE_URL}/user/carts`, 
        { cartId, size, productId, quantity }, header);
    return data;
})

export const addOneProductToCart = createAsyncThunk('cart/addOneProductToCart',
    async ({ size, productId, token }, { getState }) => {
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const cartId = getState().cart.cartId;
    const { data } = await axios.put(`${CART_BASE_URL}/user/carts/${cartId}/products/${productId}/${size}/addOne`,{}, header);
    console.log('addOneSlice',data)
    return data;
})

export const substractOneProduct = createAsyncThunk('cart/substractOneProduct',
    async ({ size, productId, token }, { getState }) => {
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const cartId = getState().cart.cartId;
    const { data } = await axios.put(`${CART_BASE_URL}/user/carts/${cartId}/products/${productId}/${size}/substractOne`,{}, header);
    console.log('SubtractOneSlice',data)
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

export const applyDiscountCode = createAsyncThunk('cart/applyDiscountCode', async ({ code, token }, { getState }) => {
    const cartId = getState().cart.cartId;
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const { data } = await axios.put(`${CART_BASE_URL}/user/carts/add-discount/${code}/cart/${cartId}`, {}, header);
    return data;
})

export const getTotal = createAsyncThunk('cart/getTotal', async ({ token }, { getState }) => {
    const cartId = getState().cart.cartId;
    const header = {
        headers: {  Authorization: `Bearer ${token}` } 
    };
    const { data } = await axios.get(`${CART_BASE_URL}/user/carts/${cartId}/getTotal`,header);
    console.log('TOTAL',data)
    return data;
})

const getTotalQuantity = (cartItems) => {
    let total = 0;
    for(let item of cartItems){
        total += item.quantity;
    }
    return total;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartId: null,
        cartItems: [],
        totalQuantity: 0,
        total: 0,
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
                state.totalQuantity = getTotalQuantity(state.cartItems);
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartProducts;
                state.totalQuantity = getTotalQuantity(state.cartItems);
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(addOneProductToCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartProducts;
                state.totalQuantity = getTotalQuantity(state.cartItems);
            })
            .addCase(addOneProductToCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(substractOneProduct.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartProducts;
                state.totalQuantity = getTotalQuantity(state.cartItems);
            })
            .addCase(substractOneProduct.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartProducts;
                state.totalQuantity = getTotalQuantity(state.cartItems);
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.cartItems = [];
                state.totalQuantity = 0;
                state.discountCode = null;
            })
            .addCase(applyDiscountCode.fulfilled, (state, action) => {
                state.discountCode = action.payload.discountCode;
            })
            .addCase(getTotal.fulfilled, (state, action) => {
                state.total = action.payload;
            })
    }
});

export default cartSlice.reducer;