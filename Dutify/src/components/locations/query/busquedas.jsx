import { useEffect, useState } from "react";
import { getUserPlaylists, searchTracks } from "../../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../../cardsGrid/cardsGrid";
import SongList from "../../songList/songList";
import "./busqueda.css";

function SearchResults() {
  const [tracks, setLists] = useState([]);

  const cargarlista = async () => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    let lista = await searchTracks(query,50)
    setLists(lista);
  }

  useEffect(() => {
    cargarlista();
  }, []);

  return (
    <div className="busqueda-wrapper">
        <div className="busqueda">
            <SongList tracks={tracks}></SongList>
        </div>
    </div>
  );
}

export default SearchResults;