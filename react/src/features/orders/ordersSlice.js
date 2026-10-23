import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: []
  },
  reducers: {
    placeOrder: (state, action) => {
      state.items.unshift(action.payload);
    }
  }
});

export const { placeOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
