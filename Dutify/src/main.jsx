import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { ThemeContextProvider } from './context/ThemeContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <App></App>
  </ThemeContextProvider>
)
