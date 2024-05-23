import { useEffect, useState } from "react";
import {
  getUserPlaylists,
  searchTopTracks,
  searchTracks,
} from "../../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../../cardsGrid/cardsGrid";
import SongList from "../../songList/songList";
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
    cargarlista().finally(() => setLoading(false));
  }, []);

  return (
    <div className="busqueda-wrapper">
      <div className="busqueda-container">
        {query ? <h4>Resultados para: {query}</h4> : <h4>Tus top tracks:</h4> }
        <div className="busqueda">
            {loading ? <Spinner></Spinner> : <SongList tracks={tracks} playlistId={playListId} busqueda={true}></SongList>}    
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
