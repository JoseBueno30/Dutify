import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ListCard from "./components/listCard/listCard";
import GenreCard from "./components/genreCard/genreCard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="d-flex">
      <GenreCard genreName="Reggaeton" background="reggaeton"/>
      <GenreCard genreName="Pop" background="pop"/>
    </div>
    <div className="d-flex">
      <GenreCard genreName="Rock" background="rock"/>
      <GenreCard genreName="Anime" background="anime"/>
    </div>
  </React.StrictMode>
);
