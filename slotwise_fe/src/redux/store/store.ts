import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { apiSlice } from '@/redux/services/baseApi';
import authReducer from '@/redux/features/authSlice';
import snackbarReducer from '@/redux/features/snackbarSlice';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { combineReducers } from '@reduxjs/toolkit';
 
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve();
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};
 
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();
 
const persistConfig = {
  key: 'root',
  storage,
};
 
const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  snackbar: snackbarReducer,
});
 
const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  return appReducer(state, action);
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
 
export const persistor = persistStore(store);
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;