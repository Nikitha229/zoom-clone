import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import { ContextProvider } from './SocketContext';

import './style.css';

const theme = createTheme();
// Get the root element
const rootElement = document.getElementById('root');

// Create root and render the app
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ContextProvider>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </ContextProvider>
);
