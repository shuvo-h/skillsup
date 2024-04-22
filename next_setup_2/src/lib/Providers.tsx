'use client';

import { store } from "@/redux/store";
import { Provider } from "react-redux";

type TProdicerProps = {
    children: React.ReactNode
}
const Providers = ({children}:TProdicerProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default Providers;