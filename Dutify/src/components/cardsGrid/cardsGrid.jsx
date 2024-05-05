import React from "react";

import listData from "../../data/listData.json";
import genreData from "../../data/genreData.json";
import recentListsData from "../../data/recentListsData.json";

import GenreCard from "../genreCard/genreCard";
import ListCard from "../listCard/listCard";
import AddCard from "../addCard/addCard";

import "./cardsGridStyle.css";

function CardsGrid({ type }) {
  const gridElements = () => {
    let gridList = [];
    const data = ListFromJSON(type);

    if (type === "genre") {
      gridList = data.map((genre) => (
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
            <AddCard>Añadir nueva lista</AddCard>
          </div>
        );
      }
    }

    return gridList;
  };

  return (
    <div id="cards_container">
      <div className="row row-cols-md-3 row-cols-2 g-4" id="cards_table">
        {gridElements()}
      </div>
    </div>
  );
}

function ListFromJSON(name) {
  let data;

  switch (name) {
    case "list":
      data = listData;
      break;
    case "genre":
      data = genreData;
      break;
    case "recentLists":
      data = recentListsData;
      break;
  }

  var contKey = 0;

  const res = data.map((item) => ({
    ...item,
    key: contKey++,
  }));

  return res;
}

export default CardsGrid;
