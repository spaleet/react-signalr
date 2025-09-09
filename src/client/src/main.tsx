import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import lightTheme from './themes/lightTheme';
import { HubContextProvider } from '@contexts/_index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme} >
      <CssBaseline />

      <HubContextProvider>
        <App />
      </HubContextProvider>

    </ThemeProvider>
  </StrictMode>
)
