import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./features/coutnSlice"
import authSlice from "./features/auth/authSlice"
import { baseAPI } from './api/baseAPI'
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';


// persist from localStorage
const persistConfig = {
  key: 'auth',
  storage,
}
const persistedAuthReducer = persistReducer(persistConfig,authSlice)

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    counter: counterSlice,
    // auth: authSlice,   // without persist
    auth: persistedAuthReducer, // with persist
  },
  middleware: getDefaultMiddlewares => getDefaultMiddlewares({
    serializableCheck:{
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(baseAPI.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// append this persistor to <App> provider using <PersistGate><
export const persistor = persistStore(store);
