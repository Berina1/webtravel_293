import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { ThemeProvider } from './context/themeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <App />
    </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

