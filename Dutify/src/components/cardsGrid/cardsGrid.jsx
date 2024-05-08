import React from "react";
import GenreCard from "./cards/genreCard/genreCard";
import ListCard from "./cards/listCard/listCard";
import AddCard from "./cards/addCard/addCard";

import "./cardsGridStyle.css";

function CardsGrid({type, data}) {
  const gridElements = () => {
    let gridList = [];
    const cardData = data

    if (type === "genre") {
      gridList = cardData.map((genre) => (
        <div className="col col_content" key={genre.key}>
          <GenreCard
            genreName={genre.genreName}
            background={genre.background}
          />
        </div>
      ));
    } else if (type === "list" || type === "recentLists") {
      gridList = data.map((list) => (
        <div className="col col_content" key={list.key}>
          <ListCard listName={list.listName} background={list.background} />
        </div>
      ));
      if (type === "list") {
        gridList.push(
          <div className="col col_content" key={100}>
            <AddCard>Nueva lista</AddCard>
          </div>
        );
      }
    }

    return gridList;
  };

  return (
    <div className="container-fluid">
      <div id="cards_container">
        <div className="row row-cols-md-3 row-cols-2 g-4" id="cards_table">
          {gridElements()}
        </div>
      </div>
    </div>
  );
}

export default CardsGrid;
