import { useEffect, useState } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";

import listData from "../../../data/listData.json";
import genreData from "../../../data/genreData.json";
import recentListsData from "../../../data/recentListsData.json";
import { getCategoriePlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import "./genresStyle.css";

function Genres({ token }) {
  const [genres, setGenres] = useState([]);

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
    window.location.href = "/Generos/Listas?genero=" + id;
  };

  return (
    <section className="genres-section" aria-labelledBy="section-header">
      <h5 className="h5-recent-lists" id="section-header" aria-live="assertive">
        Lista de géneros:
      </h5>
      <CardsGrid
        type="genre"
        data={genres}
        clickFunction={goToListasGenero}
      ></CardsGrid>
    </section>
  );
}

export default Genres;
