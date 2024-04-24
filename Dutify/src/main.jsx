import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ListCard from "./components/listCard/listCard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="d-flex">
      <ListCard listName="NombreDeLista" listImage="/assets/mora_estrella.jpg"/>
    </div>
  </React.StrictMode>
);
