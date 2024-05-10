import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ThemeContextProvider } from "./context/ThemeContext";
import App from "./App";
import { LocationContextProvider } from "./context/LocationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LocationContextProvider>
    <ThemeContextProvider>
      <App></App>
    </ThemeContextProvider>
  </LocationContextProvider>
);
