import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postsReducer from "./postsSlice";
import interactionsReducer from "./interactionsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    interactions: interactionsReducer,
  },
});
