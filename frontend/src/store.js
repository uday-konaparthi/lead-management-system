import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';

import navbarReducer from './redux/navbar'
import userReducer from './redux/user'
import leadsReducer from './redux/leads'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme', 'user'], 
};

const rootReducer = combineReducers({
  navbar: navbarReducer,
  user: userReducer,
  leads: leadsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);