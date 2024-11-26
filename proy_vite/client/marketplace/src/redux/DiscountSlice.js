import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_DISCOUNT_URL = 'http://localhost:4002/api/admin/discounts';

export const getDiscounts = createAsyncThunk('discount/getDiscounts', async ({ token }) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.get(`${BASE_DISCOUNT_URL}`, config); 
    return data;    
});

export const createDiscount = createAsyncThunk('discount/createDiscount', 
    async ({ code, description, percentage, fixedAmount, startDate, endDate, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const body = {
        code, 
        description,
        percentage,
        fixedAmount,
        startDate,
        endDate,
    };
    const { data } = await axios.post(`${BASE_DISCOUNT_URL}/create`, body, config);
    return data;
});

export const deleteDiscount = createAsyncThunk('discount/deleteDiscount', async ({ id, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    await axios.delete(`${BASE_DISCOUNT_URL}/delete/${id}`, config);
    return id;
});

export const updateDiscount = createAsyncThunk('discount/updateDiscount', 
    async ({ id, code, description, percentage, fixedAmount, startDate, endDate, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const body = {
        id,
        code,
        description,
        percentage,
        fixedAmount,
        startDate,
        endDate,
    };
    const { data } = await axios.put(`${BASE_DISCOUNT_URL}/update`, body, config);
    return data;
});

const formatDate = (dateString) => {
    return new Date(dateString).toISOString();
};

const discountSlice = createSlice({
    name: 'discount',
    initialState: {
        discounts: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDiscounts.fulfilled, (state, action) => {
                state.discounts = action.payload.map(discount => ({
                    ...discount,
                    startDate: formatDate(discount.startDate),
                    endDate: formatDate(discount.endDate),
                }));
            })
            .addCase(getDiscounts.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getDiscounts.pending, (state) => {
                state.error = null;
            })

            .addCase(createDiscount.fulfilled, (state, action) => {
                state.discounts.push({
                    ...action.payload, 
                    startDate: formatDate(action.payload.startDate), 
                    endDate: formatDate(action.payload.endDate)
                });
            })
            .addCase(createDiscount.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(createDiscount.pending, (state) => {
                state.error = null;
            })

            .addCase(updateDiscount.fulfilled, (state, action) => {
                const index = state.discounts.findIndex(discount => discount.id === action.payload.id);
                state.discounts[index] = {
                    ...action.payload, 
                    startDate: formatDate(action.payload.startDate), 
                    endDate: formatDate(action.payload.endDate)
                };
            })
            .addCase(updateDiscount.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateDiscount.pending, (state) => {
                state.error = null;
            })

            .addCase(deleteDiscount.fulfilled, (state, action) => {
                state.discounts = state.discounts.filter(discount => discount.id !== action.payload);
            })
            .addCase(deleteDiscount.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteDiscount.pending, (state) => {
                state.error = null;
            })
    }
});

export default discountSlice.reducer;