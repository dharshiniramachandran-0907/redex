
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/products/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

import {
  persistReducer,
  persistStore
} from 'redux-persist';

import storage from 'redux-persist/es/storage';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  favorites: favoritesReducer
});

const persistConfig = {
  key: 'shopkart',
  storage,
  whitelist: ['cart', 'orders', 'favorites']
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE'
        ]
      }
    })
});

export const persistor = persistStore(store);
