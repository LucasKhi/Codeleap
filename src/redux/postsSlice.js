import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dev.codeleap.co.uk/careers/";

const initialState = {
  items: [],
  loading: false,
  error: null,
  nextPage: null,
};

/**
 * Fetches posts from the CodeLeap API.
 * Supports pagination by accepting an optional URL.
 * @param {string} url - The URL to fetch posts from. Defaults to the base API URL.
 * @returns {Object} An object containing the API response data and a flag indicating if it's a next page.
 */
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (url = API_URL) => {
    const response = await axios.get(url);
    return { ...response.data, isNextPage: url !== API_URL };
  },
);

/**
 * Creates a new post.
 * @param {Object} post - The post data { username, title, content }.
 * @returns {Object} The created post data returned by the API.
 */
export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  const response = await axios.post(API_URL, post);
  return response.data;
});

/**
 * Updates an existing post using PATCH.
 * @param {Object} params - The post ID and updated fields { id, title, content }.
 * @returns {Object} The updated post data returned by the API.
 */
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, title, content }) => {
    const response = await axios.patch(`${API_URL}${id}/`, { title, content });
    return response.data;
  },
);

/**
 * Deletes a post from the API.
 * @param {number} id - The ID of the post to delete.
 * @returns {number} The ID of the deleted post.
 */
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`${API_URL}${id}/`);
  return id;
});

/**
 * Redux slice for managing posts state.
 * Handles async actions for fetching, creating, updating, and deleting posts.
 * Includes logic for infinite scrolling by appending results when fetching next pages.
 */
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.isNextPage) {
          state.items = [...state.items, ...action.payload.results];
        } else {
          state.items = action.payload.results;
        }
        state.nextPage = action.payload.next;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
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
