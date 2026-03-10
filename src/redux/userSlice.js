import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: localStorage.getItem('username') || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.username = action.payload;
            localStorage.setItem('username', action.payload);
        },
        logout: (state) => {
            state.username = null;
            localStorage.removeItem('username');
        },
    },
});

export const { setUserName, logout } = userSlice.actions;
export default userSlice.reducer;
