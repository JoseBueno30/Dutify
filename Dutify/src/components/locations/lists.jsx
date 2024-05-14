import { useEffect, useState } from "react";
import { getUserPlaylists,createPlaylist } from "../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../cardsGrid/cardsGrid";
import ListModal from "../listModal/listModal";

function Lists({token}) {
  const [lists, setLists] = useState([]);

  const cargarPlaylists = async () =>{
    console.log( await getUserPlaylists(token))
    setLists(await getUserPlaylists(token))
  }

  const crearPlaylist = async (nameList,publicList) =>{
    const data = await createPlaylist(nameList,publicList);
    
    return data.id;
  }

  useEffect(() => {
    cargarPlaylists();
  }, []);


  return (
    <>
      <CardsGrid type="list" data={lists}></CardsGrid>
      <ListModal apiCall={crearPlaylist}/>
    </>
  );
}

export default Lists;
