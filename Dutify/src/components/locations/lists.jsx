import { useEffect, useState } from "react";
import { getUserPlaylists } from "../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../cardsGrid/cardsGrid";

function Lists({}) {
  const [lists, setLists] = useState([]);

  const cargarPlaylists = async () =>{
    setLists(await getUserPlaylists())
  }

  useEffect(() => {
    cargarPlaylists();
  }, []);

  return (
    <CardsGrid type="list" data={lists}></CardsGrid>
  );
}

export default Lists;
