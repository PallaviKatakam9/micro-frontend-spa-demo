import { createSlice } from '@reduxjs/toolkit';


const initialState = { products: [] };

const productsBSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('storeB/fetchProducts/fulfilled', (state, action) => {
        console.log('Fetched products:', action.payload);
        state.products = action.payload.products;
      }).addCase('storeB/fetchProducts/rejected', (state, action) => {
        console.error('Failed to fetch products:', action.error);
      }); 
  },
});

export const { addToCart, removeFromCart, clearCart } = productsBSlice.actions;
export default productsBSlice.reducer;
