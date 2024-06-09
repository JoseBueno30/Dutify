import { useEffect, useState,useContext } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";
import { getCategoriePlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import "./genresStyle.css";
import Spinner from "../../spinner/spinner";
import genreData from "../../../data/genreData.json";
import { PageHandlerContext } from "../../../App";

const getGenreName = (id) => {
  const genre = genreData.find((genre) => genre.id === id);
  return genre.genreName;
};

function GenreLists( {genre} ) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const genreName = getGenreName(genre);

  const setPage = useContext(PageHandlerContext).setPage;
  const setPlaylistId = useContext(PageHandlerContext).setPlaylistId;

  const cargarPlaylists = async () => {
    setLoading(true);
    setLists(
      await getCategoriePlaylists(genre, 30).finally(() => setLoading(false))
    );
  };

  useEffect(() => {
    document.title = "Listas " + genreName + " | Dutify";
    cargarPlaylists();
  }, []);

  const listButtonClickHandler = (e) => {
    const key = e.currentTarget.id;
    setPlaylistId(key);
    setPage("/playlist");
  };

  return (
    <section
      className="genres-section"
      aria-labelledBy="section-header"
      aria-busy={loading}
    >
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <h5
            className="h5-recent-lists"
            id="section-header"
            aria-live="assertive"
          >
            Playlists de género {genreName}:
          </h5>
          <CardsGrid
            type="genrelists"
            data={lists}
            clickFunction={listButtonClickHandler}
          ></CardsGrid>
        </>
      )}
    </section>
  );
}

export default GenreLists;
