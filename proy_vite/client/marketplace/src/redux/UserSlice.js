import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_USER_URL = 'http://localhost:3001/api';

export const getUsers = createAsyncThunk( 'user/getUsers', async ({ token }) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.get(`${BASE_USER_URL}/admin/users`, config);
    return data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })
    }
});

export default userSlice.reducer;