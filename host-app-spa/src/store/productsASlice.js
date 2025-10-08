import { createSlice } from '@reduxjs/toolkit';


const initialState = { products: [] };

const productsASlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('storeA/fetchProducts/fulfilled', (state, action) => {
        console.log('Fetched products:', action.payload);
        state.products = action.payload;
      }).addCase('storeA/fetchProducts/rejected', (state, action) => {
        console.error('Failed to fetch products:', action.error);
      }); 
  },
});

export const { addToCart, removeFromCart, clearCart } = productsASlice.actions;
export default productsASlice.reducer;
