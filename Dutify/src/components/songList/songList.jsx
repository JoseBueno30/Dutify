import React, { useEffect } from "react";
import { useState } from "react";
import SongButton from "../songButton/songButton";
import "./songListStyle.css";
import { SpotifyWebAPI } from "../../SpotifyWebAPI/SpotifyWebAPI";
import AddSongButton from "./addSongButton/addSongButton";
import SongInfo from "./songInfo/songInfo";

export default function SongList({token}) {
    const [topTracks, setTopTracks] = useState("");

    useEffect(()=>{
        async function obtenerDatos() {
            try{
                const spotify = new SpotifyWebAPI(token);
                const tracks = await spotify.getTopTracks(20);
                setTopTracks();
                console.log(tracks);
            }catch(error){
                console.error("ERROR: ", error);
            }
        }
        obtenerDatos();
    }, []);

    

    

  return (
    <div className="list container-fluid ">
      {topTracks ? (<SongInfo/>) : (<></>)}
      
      {topTracks ? (
          topTracks.map((track) => (
            <SongButton
              key={track.id}
              name={track.name}
              artistName={track.artists[0].name}
              albumName={track.album.name}
              image={track.album.images[2].url}
              time_ms={track.duration_ms}
            />
          ))
      ) : (
        <div className="emptyList d-flex justify-content-center">No hay canciones en esta PlayList</div>
      )}
      <div className="d-flex justify-content-center"><AddSongButton/></div>
      
    </div>
  );
}
