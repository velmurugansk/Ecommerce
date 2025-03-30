import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/rootReducer'
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cookieAuth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);
export default store