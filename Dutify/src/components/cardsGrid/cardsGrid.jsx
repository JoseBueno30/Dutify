import React from "react";
import GenreCard from "../genreCard/genreCard";
import ListCard from "../listCard/listCard";
import genreData from "../../genreData.json";
import "./cardsGridStyle.css";

function CardsGrid(type) {
  return (
    <div id="cards_container">
      <div className="row row-cols-md-3 row-cols-2 g-2" id="cards_table">
        {genreData.map((genre) => (
          <div className="col d-flex justify-content-center">
            <GenreCard
              key={genre.genreName}
              genreName={genre.genreName}
              background={genre.background}
            />
          </div>
        ))}
        ;
      </div>
    </div>
  );
}

export default CardsGrid;
