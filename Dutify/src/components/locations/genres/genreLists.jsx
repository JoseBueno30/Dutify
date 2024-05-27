import { useEffect, useState } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";
import { getCategoriePlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import "./genresStyle.css";
import Spinner from "../../spinner/spinner";
import genreData from "../../../data/genreData.json";

const getGenreID = () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("genero");
  return id;
};

const getGenreName = (id) => {
  const genre = genreData.find((genre) => genre.id === id);
  return genre.genreName;
};

function GenreLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const genreID = getGenreID();
  const genreName = getGenreName(genreID);

  const cargarPlaylists = async () => {
    setLoading(true);
    setLists(
      await getCategoriePlaylists(genreID, 30).finally(() => setLoading(false))
    );
  };

  useEffect(() => {
    document.title = "Listas " + genreName + " | Dutify";
    cargarPlaylists();
  }, []);

  const listButtonClickHandler = (e) => {
    const key = e.currentTarget.id;
    window.location.href = "playlist?playlistId=" + key;
  };

  return (
    <section
      className="genres-section"
      aria-label={"Playlists de género " + genreName}
    >
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <CardsGrid
          type="genrelists"
          data={lists}
          clickFunction={listButtonClickHandler}
        ></CardsGrid>
      )}
    </section>
  );
}

export default GenreLists;
