import React, { useEffect } from "react";
import { useState } from "react";
import SongButton from "../songButton/songButton";
import "./songListStyle.css";

import AddSongButton from "./addSongButton/addSongButton";
import SongInfo from "./songInfo/songInfo";
import { getUserOwnedPlaylists } from "../../spotifyApi/SpotifyApiCalls";

export default function SongList({tracks, playlistId}) {
    const [userPlayLists, setUserPlayLists] = useState("");

    useEffect(()=>{
        async function getUserPlayLists() {
            try{
              console.log(tracks);
                setUserPlayLists(await getUserOwnedPlaylists());
            }catch(error){
                console.error("ERROR: ", error);
            }
        }
        getUserPlayLists();
    }, []);

    

    

  return (
    <div className="list container-fluid ">
      {tracks.length>0 ? (<SongInfo/>) : (<></>)}
      
      {tracks.length>0 ? (
          tracks.map((track) => (
            track.track !== null ? <SongButton
            key={track.track.id}
            track={track.track}
            playlistId = {playlistId}
            playLists={userPlayLists}
          /> : <></>
          ))
      ) : (
        <div className="emptyList d-flex justify-content-center">No hay canciones en esta PlayList</div>
      )}
      {playlistId?
      <div className="d-flex justify-content-center"><AddSongButton/></div>
      :null}
    </div>
  );
}
