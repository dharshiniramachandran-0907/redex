
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: []
  },

  reducers: {

    addToCart: (state, action) => {
      const product = action.payload;

      const existing = state.items.find(
        item => item.id === product.id
      );

      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1
        });
      }
    },

    increase: (state, action) => {
      const item = state.items.find(
        item => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decrease: (state, action) => {
      const item = state.items.find(
        item => item.id === action.payload
      );

      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            product => product.id !== action.payload
          );
        } else {
          item.quantity -= 1;
        }
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  increase,
  decrease,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export const selectTotalItems = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

export const selectTotalPrice = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
