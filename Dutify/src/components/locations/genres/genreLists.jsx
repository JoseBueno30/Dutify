import { useEffect, useState } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";
import { getCategoriePlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import './genres.css';

const getGenreID = () =>{
  const url = new URL(window.location.href);

  const id = url.searchParams.get("genero");
  return id;
}

function GenreLists() {
  const [lists, setLists] = useState([]);

  const cargarPlaylists = async () =>{
    const id = getGenreID();

    setLists(await getCategoriePlaylists(id,30))
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
      <CardsGrid type="genrelists" data={lists} clickFunction={listButtonClickHandler}></CardsGrid>
    </section>
  );
}

export default GenreLists