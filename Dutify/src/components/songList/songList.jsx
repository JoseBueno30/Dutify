import React, { useEffect } from "react";
import { useState } from "react";
import SongButton from "../songButton/songButton";
import "./songListStyle.css";

import AddSongButton from "./addSongButton/addSongButton";
import SongInfo from "./songInfo/songInfo";
import { getUserOwnedPlaylists } from "../../spotifyApi/SpotifyApiCalls";

export default function SongList({tracks, playlistId, loadQueue, setPlaying}) {
    const [userPlayLists, setUserPlayLists] = useState("");

    useEffect(()=>{
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
      <SongInfo/>      
      {/* PARA PLAYLIST */}
      {tracks.length>0 && playlistId ? (
          tracks.map((track, index) => (
            track !== null ? <SongButton
            enPlaylist={true}
            key={index}
            index={index}
            track={track.track}
            loadQueue={loadQueue}
            playlistId = {playlistId}
            playLists={userPlayLists}
            setPlaying={setPlaying}
          /> : <></>
          ))
      ) : (
        <></>
      )}
      {/* PARA BUSQUEDA */}
      {tracks.length>0 && !playlistId ? (
          tracks.map((track) => (
            track.track !== null ? <SongButton
            enPlaylist={false}
            key={track.id}
            track={track}
            playLists={userPlayLists}
          /> : <></>
          ))
      ) : ( <></>
      )}
      {playlistId && tracks.length == 0 ? <div className="emptyList d-flex justify-content-center">No hay canciones en esta PlayList</div> : <></>}
      {!playlistId && tracks.length == 0 ? <div className="emptyList d-flex justify-content-center">Busca la canción en la barra de busqueda para añadir</div> : <></>}

      {playlistId?
      <div className="d-flex justify-content-center"><AddSongButton/></div>
      :null}
    </div>
  );
}
