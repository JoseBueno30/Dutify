import { useEffect, useState } from "react";
import { getUserPlaylists, searchTracks } from "../../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../../cardsGrid/cardsGrid";
import SongList from "../../songList/songList";
import "./busqueda.css";
import Spinner from "../../spinner/spinner";

function SearchResults() {
  const [tracks, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarlista = async () => {
    setLoading(true);
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    let lista = await searchTracks(query,50)
    setLists(lista);
  }

  useEffect(() => {
    cargarlista().finally(() => setLoading(false));
  }, []);

  return (
    <div className="busqueda-wrapper">
        <div className="busqueda">
            {loading ? <Spinner></Spinner> : <SongList tracks={tracks}></SongList>}    
        </div>
    </div>
  );
}

export default SearchResults;