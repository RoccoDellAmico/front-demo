import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_ORDER_URL = 'http://localhost:4002/api';

export const getOrders = createAsyncThunk( 'order/getOrders', async ({ token }) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.get(`${BASE_ORDER_URL}/admin/orders`, config);
    return data;
});

export const getOrdersByUser = createAsyncThunk( 'order/getOrdersByUser', async ({ userId, token }) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.get(`${BASE_ORDER_URL}/user/orders/${userId}`, config);
    return data;
});

export const placeOrder = createAsyncThunk( 'order/placeOrder', async ({ cartId, token }) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.post(`${BASE_ORDER_URL}/user/placeOrder/${cartId}`, config);
    return data;
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(getOrdersByUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getOrdersByUser.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload);
            })
    }
});

export default orderSlice.reducer;