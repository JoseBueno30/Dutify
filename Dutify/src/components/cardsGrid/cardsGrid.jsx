import React from "react";

import GenreCard from "../genreCard/genreCard";
import ListCard from "../listCard/listCard";

import genreData from "../../data/genreData.json";
import listData from "../../data/listData.json";
import recentListsData from "../../data/recentListsData.json";

import "./cardsGridStyle.css";

function CardsGrid({ type }) {

  const gridElements = () => {
    let gridList = [];

    if (type === "genre") {
      gridList = genreData.map((genre) => (
        <div className="col col_content" key={genre.key}>
          <GenreCard
            genreName={genre.genreName}
            background={genre.background}
          />
        </div>
      ));
    } else if (type === "list") {
      gridList = listData.map((list) => (
        <div className="col col_content" key={list.key}>
          <ListCard listName={list.listName} background={list.background} />
        </div>
      ));
    } else if (type === "recent") {
      gridList = recentListsData.map((list) => (
        <div className="col col_content" key={list.key}>
          <ListCard listName={list.listName} background={list.background} />
        </div>
      ));
    }

    return gridList;
  };

  return (
    <div id="cards_container">
      <div className="row row-cols-md-3 row-cols-2 g-2" id="cards_table">
        {gridElements()}
      </div>
    </div>
  );
}

function ListFromJSON(name) {
  res = [];
  import data from "../../data/" + name + "ListData.json";
}

export default CardsGrid;
