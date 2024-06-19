import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Adjust the path as needed

const store = configureStore({
  reducer: {
    auth: authReducer // Add other reducers here if necessary
  }
});

export default store;
