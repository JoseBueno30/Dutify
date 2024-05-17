import { useEffect, useState } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";
import { getCategoriePlaylists } from "../../../spotifyApi/SpotifyApiCalls";

const getGenreID = () =>{
  const url = new URL(window.location.href);

  const id = url.searchParams.get("genero");
  return id;
}

function GenreLists() {
  const [lists, setLists] = useState([]);

  const cargarPlaylists = async () =>{
    const id = getGenreID();

    setLists(await getCategoriePlaylists(id))
  }

  useEffect(() => {
    cargarPlaylists();
  }, []);

  const listButtonClickHandler = (e) => {
    const key = e.currentTarget.id;
    window.location.href = "playlist?playlistId=" + key;
  };

  return (
    <CardsGrid type="list" data={lists} clickFunction={listButtonClickHandler}></CardsGrid>
  );
}

export default GenreLists