import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import LoggerMiddleware from "./middleware/logger";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
    },
    devTools: import.meta.env.MODE === 'development', // in production isProduction = false
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(LoggerMiddleware),

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
