import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_USER_URL = 'http://localhost:3001/api';

export const fetchProducts = createAsyncThunk( 'product/fetchProducts', async () => {
    const response = await axios.get(`${BASE_USER_URL}/products/get`);
    return response.data;
})

export const fetchProductsAdmin = createAsyncThunk( 'product/fetchProductsAdmin', async ({ token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${BASE_USER_URL}/admin/products/get`, config);
    return response.data;
})

export const createProduct = createAsyncThunk( 'product/createProduct', async ({ newProduct, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${BASE_USER_URL}/admin/products`, newProduct, config);
    return { data: response.data, newProduct };
})

export const updateProduct = createAsyncThunk( 'product/updateProduct', async ({ product, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`${BASE_USER_URL}/admin/products/update`, product, config);
    return { data: response.data, product };
})

export const deleteProduct = createAsyncThunk( 'product/deleteProduct', async ({ id, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    await axios.delete(`${BASE_USER_URL}/admin/products/${id}`, config);
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        adminProducts: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchProductsAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductsAdmin.fulfilled, (state, action) => {
                state.adminProducts = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductsAdmin.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.adminProducts.push(action.payload.newProduct);
                state.products.push(action.payload.data);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.adminProducts.findIndex(product => product._id === action.payload.product._id);
                state.adminProducts[index] = action.payload.product;
                const index2 = state.products.findIndex(product => product._id === action.payload.data._id);
                state.products[index2] = action.payload.data;
            })
    }
});

export default productSlice.reducer;