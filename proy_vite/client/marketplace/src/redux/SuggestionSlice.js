import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_USER_URL = 'http://localhost:4002/api';

export const createSuggestion = createAsyncThunk(
    'suggestion/createSuggestion',
    async ({ description, photo, userId, token }) => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.post(`${BASE_USER_URL}/user/suggestion/create`, 
            { description, photo, userId }, header);
        return data;
    }
);

export const fetchSuggestions = createAsyncThunk(
    'suggestion/fetchSuggestions',
    async ({ token }) => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`${BASE_USER_URL}/admin/suggestions`, header);
        return data;
    }
);



const suggestionSlice = createSlice({
    name: 'suggestion',
    initialState: {
        suggestions: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSuggestion.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSuggestion.fulfilled, (state, action) => {
                state.loading = false;
                state.suggestions.push(action.payload);
            })
            .addCase(createSuggestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSuggestions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSuggestions.fulfilled, (state, action) => {
                state.loading = false;
                state.suggestions = action.payload;
            })
            .addCase(fetchSuggestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default suggestionSlice.reducer;