import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';
import productsAReducer from './productsASlice.js';
import productsBReducer from './productsBSlice.js'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    storeAProducts : productsAReducer,
    storeBProducts : productsBReducer
  },
});
