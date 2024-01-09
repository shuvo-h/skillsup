import * as React from "react";
import {
  decrement,
  increment,
  incrementByValue,
} from "./redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/storeHook";

function App() {
  const { count } = useAppSelector((state) => state.counter);
  console.log(count);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="flex border border-purple-300 p-2 rounded-md bg-slate-50">
          <div className="flex">
            <button
              className="px-3 py-2 rounded-md bg-green-500 text-xl font-semibold text-white"
              onClick={() => dispatch(incrementByValue(5))}
            >
              Increment by value
            </button>
            <button
              className="px-3 py-2 rounded-md bg-green-500 text-xl font-semibold text-white"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <h1 className="text-3xl mx-10">{count}</h1>
            <button
              className="px-3 py-2 rounded-md bg-red-500 text-xl font-semibold text-white"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
