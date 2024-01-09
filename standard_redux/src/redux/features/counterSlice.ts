import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    count: number
}
const initialState:TInitialState = {
    count:0,
};

const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers: {
        increment: (state)=>{
            state.count = state.count +1;
        },
        incrementByValue: (state,action:PayloadAction<number>)=>{
            const {payload} = action;
            state.count = state.count + payload;
        },
        decrement: (state)=>{
            state.count = state.count -1;
        },
    },
})
export const {increment,decrement,incrementByValue} = counterSlice.actions;

export default counterSlice.reducer;