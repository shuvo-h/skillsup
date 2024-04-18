import { configureStore } from "@reduxjs/toolkit";
// import LoggerMiddleware from "./middleware/logger";
import counterSlice from "./features/counterSlice";
import todoSlice from "./features/todoSlice";
import { dummyJsonApi } from "./api/api";

export const store = configureStore({
    devTools: import.meta.env.MODE === 'development', // in production isProduction = false
    reducer: {
        counter: counterSlice,
        todo: todoSlice,
        [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        // LoggerMiddleware,
        dummyJsonApi.middleware,
    ),

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
