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

export const getOrdersByUser = createAsyncThunk( 'order/getOrdersByUser', async ({ id, token }) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.get(`${BASE_ORDER_URL}/user/orders/${id}`, config);
    return data;
});

export const placeOrder = createAsyncThunk( 'order/placeOrder', async ({ cartId, token }) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.delete(`${BASE_ORDER_URL}/user/placeOrder/${cartId}`, config);
    return data;
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        error: null,
        ordersByUser: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getOrders.pending, (state) => {
                state.error = null;
            })

            .addCase(getOrdersByUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getOrdersByUser.fulfilled, (state, action) => {
                state.ordersByUser = action.payload;
            })
            .addCase(getOrdersByUser.pending, (state) => {
                state.error = null;
            })

            .addCase(placeOrder.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload);
            })
            .addCase(placeOrder.pending, (state) => {
                state.error = null;
            });
    }
});

export default orderSlice.reducer;