import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    const header = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({ email, password });
    const { data } = await axios.post('http://localhost:4002/api/v1/auth/authenticate', body, header);
    return data;
});

export const signup = createAsyncThunk('auth/signup', async ({ firstname, lastname, email, password }) => {
    const header = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const body = JSON.stringify({ firstname, lastname, email, password });
    const { data } = await axios.post('http://localhost:4002/api/v1/auth/register', body, header);
    return data;
});

export const logout = createAsyncThunk('auth/logout', async ({ token }) => {
    const header = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const { data } = await axios.post('http://localhost:4002/api/user/logout/2', {}, header);
    return data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        isAuthenticated: false,
        status: 'idle',
        error: null,
        isAdmin: false,
        token: null,
    },
    reducers: {
        logoutSuccess: (state) => {
            state.id = null;
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.id = action.payload.id;
                state.isAuthenticated = true;
                state.isAdmin = action.payload.role === 'ADMIN';
                state.token = action.payload.access_token;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.id = null;
                state.isAuthenticated = false;
                state.isAdmin = false;
                state.token = null;
            });
    }
});

export const { logoutSuccess } = authSlice.actions;

export default authSlice.reducer;