import { useEffect, useState } from "react";
import {
  getUserPlaylists,
  createPlaylist,
} from "../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../cardsGrid/cardsGrid";
import ListModal from "../listModal/listModal";

function Lists({}) {
  const [lists, setLists] = useState([]);

  const cargarPlaylists = async () => {
    setLists(await getUserPlaylists());
  };

  const crearPlaylist = async (nameList, publicList) => {
    const data = await createPlaylist(nameList, publicList);

    return data.id;
  };

  useEffect(() => {
    cargarPlaylists();
  }, []);

  const listButtonClickHandler = (e) => {
    const key = e.currentTarget.getAttribute("id");
    window.location.href = "listas/playlist?playlistId=" + key;
  };

  return (
    <>
      <CardsGrid type="list" data={lists} clickFunction={listButtonClickHandler}></CardsGrid>
      <ListModal apiCall={crearPlaylist} />
    </>
  );
}

export default Lists;
