import { createSlice } from "@reduxjs/toolkit";

/**
 * Loads interaction data (likes and comments) from localStorage.
 * @returns {Object} The parsed interactions data or an empty object.
 */
const loadInteractions = () => {
  const saved = localStorage.getItem("interactions");
  return saved ? JSON.parse(saved) : {};
};

const initialState = {
  data: loadInteractions(),
};

/**
 * Redux slice for managing local "mock" interactions (likes and comments).
 * Uses localStorage for simple persistence of these interactions.
 */
const interactionsSlice = createSlice({
  name: "interactions",
  initialState,
  reducers: {
    /**
     * Toggles a like for a specific post and user.
     * Persists the change to localStorage.
     * @param {Object} state - The current state.
     * @param {Object} action - Action containing { postId, username }.
     */
    toggleLike: (state, action) => {
      const { postId, username } = action.payload;
      if (!state.data[postId]) {
        state.data[postId] = { likes: [], comments: [] };
      }
      const likes = state.data[postId].likes;
      const index = likes.indexOf(username);
      if (index === -1) {
        likes.push(username);
      } else {
        likes.splice(index, 1);
      }
      localStorage.setItem("interactions", JSON.stringify(state.data));
    },
    /**
     * Adds a comment to a specific post.
     * Persists the change to localStorage.
     * @param {Object} state - The current state.
     * @param {Object} action - Action containing { postId, username, content }.
     */
    addComment: (state, action) => {
      const { postId, username, content } = action.payload;
      if (!state.data[postId]) {
        state.data[postId] = { likes: [], comments: [] };
      }
      state.data[postId].comments.push({
        username,
        content,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("interactions", JSON.stringify(state.data));
    },
  },
});

export const { toggleLike, addComment } = interactionsSlice.actions;
export default interactionsSlice.reducer;
