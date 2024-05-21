import { useEffect, useState } from "react";
import { getUserPlaylists } from "../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../cardsGrid/cardsGrid";
import ListModal from "../listModal/listModal";

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
    <>
      <CardsGrid type="list" data={lists}></CardsGrid>
      <ListModal/>
    </>
  );
}

export default Lists;
