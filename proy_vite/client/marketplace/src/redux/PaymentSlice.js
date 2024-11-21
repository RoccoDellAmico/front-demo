import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_USER_URL = 'http://localhost:4002/api';

export const getPayments = createAsyncThunk( 'payment/getPayment', async ({ token }) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.get(`${BASE_USER_URL}/admin/payments`, config);
    return data;
});

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payments: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPayments.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getPayments.fulfilled, (state, action) => {
                state.payments = action.payload;
                state.loading = false;
            })
            .addCase(getPayments.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }   
});

export default paymentSlice.reducer;