import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './slices/authenticationSlice.jsx'

export const store = configureStore({
  reducer: {
     authentication: authenticationSlice,
  },
})