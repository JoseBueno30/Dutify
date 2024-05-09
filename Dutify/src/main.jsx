import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ThemeContextProvider } from "./context/ThemeContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <App></App>
  </ThemeContextProvider>
);
