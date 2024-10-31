import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const login = createAsyncThunk('auth/login', async (email, password, token) => {
    const header = {
        headers : {
            Authorization : `Bearer ${token}`,
        }
    }
    const body = JSON.stringify({ email, password })
    const { data } = await axios.post('http://localhost:4002/api/v1/auth/authenticate', body, header)
    return data 
}) 

export const signup = createAsyncThunk('auth/signup', async (firstname, lastname, email, password, token) => {
    const header = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const body = JSON.stringify({ firstname, lastname, email, password })
    const { data } = await axios.post('http://localhost:4002/api/v1/auth/register', body, header)
    return data
})

export const logout = createAsyncThunk('auth/logout', async (token) => {
    const header = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    await axios.post('http://localhost:4002/api/user/logout/2', null, header);
})

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        items : [],
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(signup.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
        })
        .addCase(signup.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(logout.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
        })
        .addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})