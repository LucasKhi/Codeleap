import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://dev.codeleap.co.uk/careers/';

const initialState = {
    items: [],
    loading: false,
    error: null,
    nextPage: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (url = API_URL) => {
    const response = await axios.get(url);
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, title, content }) => {
    const response = await axios.patch(`${API_URL}${id}/`, { title, content });
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    return id;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.results;
                state.nextPage = action.payload.next;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter((p) => p.id !== action.payload);
            });
    },
});

export default postsSlice.reducer;
