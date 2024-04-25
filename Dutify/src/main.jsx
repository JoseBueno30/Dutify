import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ListCard from "./components/listCard/listCard";
import GenreCard from "./components/genreCard/genreCard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="d-flex">
      <GenreCard genreName="Pop" background="pop"/>
      <GenreCard genreName="Pop" background="pop"/>
    </div>
  </React.StrictMode>
);
