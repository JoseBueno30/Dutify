import { useEffect, useState } from "react";
import { getUserPlaylists, searchTracks } from "../../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../../cardsGrid/cardsGrid";
import TrackList from "../../trackList/trackList";
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
            <TrackList tracks={tracks}></TrackList>
        </div>
    </div>
  );
}

export default SearchResults;