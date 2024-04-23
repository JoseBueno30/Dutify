import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ListCard from "./components/listCard";
import "./assets/mora_estrella.jpg"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="d-flex">
      <ListCard listName="Anime Music" listImage="./assets/mora_estrella.jpg"></ListCard>
      <ListCard listName="Estrella" listImage="./assets/mora_estrella.jpg"></ListCard>
    </div>
  </React.StrictMode>
);
