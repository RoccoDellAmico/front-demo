import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_USER_URL = 'http://localhost:3001/api';

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
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPayments.fulfilled, (state, action) => {
                state.payments = action.payload;
            })
            .addCase(getPayments.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export default paymentSlice.reducer;