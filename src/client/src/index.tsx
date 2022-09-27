import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import lightTheme from './themes/lightTheme';
import './index.css'
import { HubContextProvider } from './contexts/HubContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={lightTheme} >
            <CssBaseline />

            <HubContextProvider>
                <App />
            </HubContextProvider>
            
        </ThemeProvider>
    </React.StrictMode>
);