import { useEffect, useState } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";
import { getCategoriePlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import './genresStyle.css';
import Spinner from "../../spinner/spinner";

const getGenreID = () =>{
  const url = new URL(window.location.href);

  const id = url.searchParams.get("genero");
  return id;
}

function GenreLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarPlaylists = async () =>{
    const id = getGenreID();
    setLoading(true);
    setLists(await getCategoriePlaylists(id,30).finally(() => setLoading(false)));
  }

  useEffect(() => {
    cargarPlaylists();
  }, []);

  const listButtonClickHandler = (e) => {
    const key = e.currentTarget.id;
    window.location.href = "playlist?playlistId=" + key;
  };

  return (
    <section className="genres-section">
      {loading ? <Spinner></Spinner> : <CardsGrid type="genrelists" data={lists} clickFunction={listButtonClickHandler}></CardsGrid>}
    </section>
  );
}

export default GenreLists