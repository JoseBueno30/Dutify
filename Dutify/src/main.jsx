import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ListCard from "./components/listCard/listCard";
import GenreCard from "./components/genreCard/genreCard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="d-flex">
      <GenreCard genreName="Popfeffefefefefef" background="pop" />
      <GenreCard genreName="Rock" background="rock" />
      <GenreCard genreName="Hip-Hop" background="hip-hop" />
    </div>
    <div className="d-flex">
      <GenreCard genreName="Jazz" background="jazz" />
      <GenreCard genreName="Reggaeton" background="reggaeton" />
      <GenreCard genreName="Flamenco" background="flamenco" />
    </div>
    <div className="d-flex">
      <ListCard listName="Lo más escuchado" listImage="assets/mora_estrella.jpg"/>
      <GenreCard genreName="Metal" background="metal" />
      <GenreCard genreName="K-Pop" background="k-pop" />
    </div>
    <div className="d-flex">
      <GenreCard genreName="Soul" background="soul" />
      <GenreCard genreName="Clásica" background="clasica" />
      <GenreCard genreName="Videojuegos" background="videojuegos" />
    </div>
    <div className="d-flex">
      <GenreCard genreName="Anime" background="anime" />
      <GenreCard genreName="Trap" background="trap" />
      <GenreCard genreName="Latino" background="latino" />
    </div>
  </React.StrictMode>
);
