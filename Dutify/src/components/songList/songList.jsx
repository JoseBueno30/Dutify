import React, { useEffect } from "react";
import { useState } from "react";
import SongButton from "../songButton/songButton";
import "./songListStyle.css";

import AddSongButton from "./addSongButton/addSongButton";
import SongInfo from "./songInfo/songInfo";
import { getUserOwnedPlaylists } from "../../spotifyApi/SpotifyApiCalls";

export default function SongList({tracks, playlistId, busqueda=false}) {
    const [userPlayLists, setUserPlayLists] = useState("");

    useEffect(()=>{
      console.log(tracks);
        async function getUserPlayLists() {
            try{
                const playLists = await getUserOwnedPlaylists()
                setUserPlayLists(playLists);
            }catch(error){
                console.error("ERROR: ", error);
            }
        }
        getUserPlayLists();
    }, []);

  return (
    <div className="list container-fluid ">    
      {/* PARA PLAYLIST */}
      <SongInfo showAddButton={busqueda && playlistId}/> 
      {!busqueda ? (
          tracks.map((track) => (
            console.log(track),
            track !== null && track.track !== null ? <SongButton
            key={track.track.name + track.track.id}
            track={track.track}
            playlistId = {playlistId}
            playLists={userPlayLists}
          /> : <></>
          ))
      ) : (
        <></>
      )}
      {/* PARA BUSQUEDA */}
      {busqueda ? (
          tracks.map((track) => (
            track.track !== null ? <SongButton
            key={track.id}
            track={track}
            playLists={userPlayLists}
            playlistId = {playlistId}
            enableAddButton={true}
          /> : <></>
          ))
      ) : ( <></>
      )}
      {playlistId && tracks.length == 0 ? <div className="emptyList d-flex justify-content-center">No hay canciones en esta PlayList</div> : <></>}
      {!playlistId && tracks.length == 0 ? <div className="emptyList d-flex justify-content-center">Busca la canción en la barra de busqueda para añadir</div> : <></>}

      {playlistId && !busqueda?
      <div className="d-flex justify-content-center"><AddSongButton playlistId = {playlistId}/></div>
      :null}
    </div>
  );
}
