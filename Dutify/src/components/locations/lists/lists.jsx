import { useEffect, useState } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";
import ListModal from "../../listModal/listModal";
import { createPlaylist, getUserPlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import './lists.css';

function Lists({}) {
  const [lists, setLists] = useState([]);

  const cargarPlaylists = async () => {
    setLists(await getUserPlaylists());
  };

  useEffect(() => {
    cargarPlaylists();
  }, []);

  const listButtonClickHandler = (e) => {
    const key = e.currentTarget.id;
    window.location.href = "listas/playlist?playlistId=" + key;
  };

  return (
    <section className="lists-section">
      <CardsGrid type="list" data={lists} clickFunction={listButtonClickHandler}></CardsGrid>
      <ListModal/>
    </section>
  );
}

export default Lists;
