import React, { useEffect } from "react";
import { useState } from "react";
import SongButton from "../songButton/songButton";
import "./songListStyle.css";

import AddSongButton from "./addSongButton/addSongButton";
import SongInfo from "./songInfo/songInfo";
import { getUserOwnedPlaylists } from "../../spotifyApi/SpotifyApiCalls";

export default function SongList({token, tracks}) {
    const [userPlayLists, setUserPlayLists] = useState("");

    useEffect(()=>{
        async function getUserPlayLists() {
            try{
                setUserPlayLists(await getUserOwnedPlaylists(token));
            }catch(error){
                console.error("ERROR: ", error);
            }
        }
        // console.log(userPlayLists);
        getUserPlayLists();
    }, []);

    

    

  return (
    <div className="list container-fluid ">
      {tracks ? (<SongInfo/>) : (<></>)}
      
      {tracks ? (
          tracks.map((track) => (
            <SongButton
              key={track.id}
              name={track.name}
              artistName={track.artists[0].name}
              albumName={track.album.name}
              image={track.album.images[2].url}
              time_ms={track.duration_ms}
              playLists={userPlayLists}
            />
          ))
      ) : (
        <div className="emptyList d-flex justify-content-center">No hay canciones en esta PlayList</div>
      )}
      <div className="d-flex justify-content-center"><AddSongButton/></div>
      
    </div>
  );
}
