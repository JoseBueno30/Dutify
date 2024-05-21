import { useEffect, useState } from "react";
import {
  getUserPlaylists,
  searchTopTracks,
  searchTracks,
} from "../../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../../cardsGrid/cardsGrid";
import SongList from "../../songList/songList";
import "./busqueda.css";

function SearchResults() {
  const [tracks, setLists] = useState([]);
  const [query, setQuery] = useState("");

  const cargarlista = async () => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    let lista = [];
    if (!query) {
      lista = await searchTopTracks(50);
    } else {
      lista = await searchTracks(query, 50);
    }
    setQuery(query);
    setLists(lista);
  };

  useEffect(() => {
    cargarlista();
  }, []);

  return (
    <div className="busqueda-wrapper">
        {query ? <h4>Resultados para: {query}</h4> : <h4>Tus top tracks:</h4> }
      <div className="busqueda">
        <SongList tracks={tracks}></SongList>
      </div>
    </div>
  );
}

export default SearchResults;
