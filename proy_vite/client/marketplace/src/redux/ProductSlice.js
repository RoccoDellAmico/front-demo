import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_USER_URL = 'http://localhost:4002/api';

export const fetchProducts = createAsyncThunk( 'product/fetchProducts', async () => {
    const response = await axios.get(`${BASE_USER_URL}/public/products/get`);
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
        filteredProducts: [],
        filters: {
            searchTerm: '',
            priceRange: 0,
            league: '',
            typeOfProduct: '',
            size: ''
        },
        error: null,
        loading: false,
    },
    reducers: {
        setFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.filteredProducts = state.products.filter(product => {
                const matchesDescription = !state.filters.searchTerm || product.description.toLowerCase().includes(state.filters.searchTerm.toLowerCase());
                const matchesPrice = !state.filters.priceRange || product.price <= state.filters.priceRange;
                const matchesLeague = !state.filters.league || (product.league && product.league.toLowerCase().includes(state.filters.league.toLowerCase()));
                const matchesTypeOfProduct = !state.filters.typeOfProduct || product.typeOfProduct === state.filters.typeOfProduct;
                const matchesSize = !state.filters.size || (product.productStock && product.productStock[state.filters.size] > 0);
                return matchesDescription && matchesPrice && matchesLeague && matchesTypeOfProduct && matchesSize;
            });
        },
        clearFilters: (state) => {
            state.filters = {
                searchTerm: '',
                priceRange: 0,
                league: '' ,
                typeOfProduct: '',
                size: ''
            };
            state.filteredProducts = state.products;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.filteredProducts = action.payload; 
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
                state.adminProducts.push({ ...action.payload.newProduct, id: action.payload.data.id });
                state.products.push(action.payload.data);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.adminProducts.findIndex(product => product.id === action.payload.product.id);
                state.adminProducts[index] = action.payload.product;
                const index2 = state.products.findIndex(product => product.id === action.payload.data.id);
                state.products[index2] = action.payload.data;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.adminProducts = state.adminProducts.filter(product => product.id !== action.meta.arg.id);
                state.products = state.products.filter(product => product.id !== action.meta.arg.id);
            });
    }
});

export const { setFilter, clearFilters } = productSlice.actions;

export default productSlice.reducer;