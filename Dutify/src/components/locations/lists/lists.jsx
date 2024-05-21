import { useEffect, useState } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";
import ListModal from "../../listModal/listModal";
import { createPlaylist, getUserPlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import './lists.css';
import Spinner from "../../spinner/spinner";

function Lists({}) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarPlaylists = async () => {
    setLoading(true);
    setLists(await getUserPlaylists().finally(() => setLoading(false)) );
  };

  const crearPlaylist = async (nameList, publicList) => {
    const data = await createPlaylist(nameList, publicList);

    return data.id;
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
      {loading ? 
      <Spinner></Spinner> : 
      (<>
      <CardsGrid type="list" data={lists} clickFunction={listButtonClickHandler}>
      </CardsGrid><ListModal apiCall={crearPlaylist} />
      </>)} 
    </section>
  );
}

export default Lists;
