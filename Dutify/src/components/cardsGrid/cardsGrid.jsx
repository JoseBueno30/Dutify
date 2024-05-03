import React from "react";
import GenreCard from "../genreCard/genreCard";
import ListCard from "../listCard/listCard";
import genreData from "../../genreData.json";
import listData from "../../listData.json";
import "./cardsGridStyle.css";

function CardsGrid({type}) {

  let gridList = [];
  
  const gridElements = () => {
      if(type == "genre") {
        gridList =  genreData.map((genre) => (
          <div className="col col_content" key={genre.key}>
            <GenreCard
              genreName={genre.genreName}
              background={genre.background}
            />
          </div>
        ));
      } else if (type == "list") {
        gridList = listData.map((list) => (
          <div className="col col_content" key={genre.key}>
            <ListCard
              key={list.key}
              listName={list.listName}
              background={list.background}
            />
          </div>
        ));
      }

      return gridList;
  }

  return (
    <div id="cards_container">
      <div className="row row-cols-md-3 row-cols-2 g-2" id="cards_table">
        {gridElements()}
      </div>
    </div>
  );
}

export default CardsGrid;
