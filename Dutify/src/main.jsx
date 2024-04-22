import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ListCard from "./components/listCard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="d-flex">
      <ListCard></ListCard>
      <ListCard></ListCard>
    </div>
  </React.StrictMode>
);
