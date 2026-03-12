import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("username") || null,
};

/**
 * Redux slice for managing user session state (username).
 * Persists the username to localStorage for automatic login on refresh.
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Sets the current username and saves it to localStorage.
     * @param {Object} state - Current state.
     * @param {Object} action - Action containing the new username string.
     */
    setUserName: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },

    /**
     * Clears the current username and removes it from localStorage.
     */
    logout: (state) => {
      state.username = null;
      localStorage.removeItem("username");
    },
  },
});

export const { setUserName, logout } = userSlice.actions;
export default userSlice.reducer;
