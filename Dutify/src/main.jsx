import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ListCard from "./components/listCard/listCard";
import GenreCard from "./components/genreCard/genreCard";
import CardsGrid from "./components/cardsGrid/cardsGrid";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CardsGrid></CardsGrid>
  </React.StrictMode>
);
