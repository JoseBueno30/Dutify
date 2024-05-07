import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { ThemeContextProvider } from "./context/ThemeContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <App></App>
  </ThemeContextProvider>
);
