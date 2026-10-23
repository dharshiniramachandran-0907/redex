import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: []
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.id === product.id
      );

      if (existingIndex === -1) {
        state.items.push(product);
      } else {
        state.items.splice(existingIndex, 1);
      }
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
