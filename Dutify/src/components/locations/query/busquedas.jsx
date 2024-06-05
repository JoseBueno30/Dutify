import { useEffect, useState } from "react";
import {
  getUserPlaylists,
  searchTopTracks,
  searchTracks,
} from "../../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../../cardsGrid/cardsGrid";
import TrackList from "../../trackList/trackList";
import "./busqueda.css";
import Spinner from "../../spinner/spinner";

function SearchResults() {
  const [tracks, setLists] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [playListId, setPlayListId] = useState("");

  const cargarlista = async () => {
    setLoading(true);
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    const playListId = searchParams.get("playListId");
    let lista = [];
    if (!query) {
      lista = await searchTopTracks(50);
    } else {
      lista = await searchTracks(query, 50);
    }
    setQuery(query);
    setLists(lista);
    setPlayListId(playListId);
  };

  useEffect(() => {
    document.title = "Busqueda | Dutify";
    cargarlista().finally(() => setLoading(false));
  }, []);

  return (
    <section className="busqueda-wrapper" aria-label={"Resultados de búsqueda para: " + query} aria-live="assertive">
      <div className="busqueda-container">
      {loading ? <Spinner></Spinner> : (<>
        {query ? <h4>Resultados para: <i>{query}</i></h4> : <h4>Recomendaciones para ti:</h4> }
        <div className="busqueda">
            {loading ? <Spinner></Spinner> : <TrackList tracks={tracks} playlistId={playListId} busqueda={true}></TrackList>}    
        </div>
      </>)}
      </div>
    </section>
  );
}

export default SearchResults;
