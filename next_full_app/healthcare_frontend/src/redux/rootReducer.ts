import { baseApi } from "./api/baseAPI";

export const rootReducer = {
    [baseApi.reducerPath]: baseApi.reducer,
}