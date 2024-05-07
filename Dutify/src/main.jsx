import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ListCard from "./components/cardsGrid/cards/listCard/listCard";
import GenreCard from "./components/cardsGrid/cards/genreCard/genreCard";
import CardsGrid from "./components/cardsGrid/cardsGrid";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CardsGrid type={"list"}></CardsGrid>
  </React.StrictMode>
);
