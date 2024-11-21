import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_USER_URL = 'http://localhost:4002/api';

export const getUsers = createAsyncThunk( 'user/getUsers', async ({ token }) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.get(`${BASE_USER_URL}/admin/users`, config);
    return data;
});

export const getUserById = createAsyncThunk( 'user/getUserById', async ({ id, token }) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.get(`${BASE_USER_URL}/user/${id}`, config);
    return data;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: {},
        error: '',
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(getUserById.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
});

export default userSlice.reducer;