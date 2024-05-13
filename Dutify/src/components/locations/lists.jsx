import { useEffect, useState } from "react";
import { getUserPlaylists } from "../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../cardsGrid/cardsGrid";

function Lists({token}) {
  const [lists, setLists] = useState([]);

  const cargarPlaylists = async () =>{
    console.log( await getUserPlaylists(token))
    setLists(await getUserPlaylists(token))
  }

  useEffect(() => {
    cargarPlaylists();
  }, []);

  return (
    <CardsGrid type="list" data={lists}></CardsGrid>
  );
}

export default Lists;
