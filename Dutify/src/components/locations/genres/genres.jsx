import { useEffect, useState, useContext } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";

import listData from "../../../data/listData.json";
import genreData from "../../../data/genreData.json";
import recentListsData from "../../../data/recentListsData.json";
import { getCategoriePlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import "./genresStyle.css";
import { PageHandlerContext } from "../../../App";

function Genres() {
  const [genres, setGenres] = useState([]);
  const setPage = useContext(PageHandlerContext).setPage;
  const setGenre = useContext(PageHandlerContext).setGenre;

  useEffect(() => {
    document.title = "Géneros | Dutify";
    const data = ListFromJSON("genre");
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

  const goToListasGenero = (e) => {
    const id = e.currentTarget.id;
    setGenre(id);
    setPage("generos/listas");
  };

  return (
    <section className="genres-section" aria-labelledby="section-header">
      <h2 className="h5-recent-lists" id="section-header">
        Lista de géneros:
      </h2>
      <CardsGrid
        type="genre"
        data={genres}
        clickFunction={goToListasGenero}
      ></CardsGrid>
    </section>
  );
}

export default Genres;
