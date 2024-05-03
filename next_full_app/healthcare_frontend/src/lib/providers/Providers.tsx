'use client';


import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

type TProvders = {
    children: React.ReactNode
}
const Providers = ({children}:TProvders) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </Provider>
    );
};

export default Providers;