import { useEffect, useState } from "react";
import CardsGrid from "../cardsGrid/cardsGrid";

import listData from "../../data/listData.json";
import genreData from "../../data/genreData.json";
import recentListsData from "../../data/recentListsData.json";

function Genres({ token }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const data = ListFromJSON("genre") 
    setGenres(data);
  }, []);

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

  return <CardsGrid type="genre" data={genres}></CardsGrid>;
}

export default Genres;
