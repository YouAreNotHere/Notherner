import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import currentUser from "./currentUser";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const todoApp: any = combineReducers({currentUser});
const persistedReducer = persistReducer(persistConfig, todoApp);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }),});
// export const store = configureStore({ reducer: persistedReducer});
export const persistor = persistStore(store);
