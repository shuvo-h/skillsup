'use client';


import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";

type TProvders = {
    children: React.ReactNode
}
const Providers = ({children}:TProvders) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default Providers;