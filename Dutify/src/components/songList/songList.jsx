import React, { useEffect } from "react";
import { useState } from "react";
import SongButton from "../songButton/songButton";
import "./songListStyle.css";
import { SpotifyWebAPI } from "../../SpotifyWebAPI/SpotifyWebAPI";

export default function SongList({token}) {
    const [topTracks, setTopTracks] = useState("");

    useEffect(()=>{
        async function obtenerDatos() {
            try{
                const spotify = new SpotifyWebAPI(token);
                const tracks = await spotify.getTopTracks(10);
                setTopTracks(tracks);
                console.log(tracks);
            }catch(error){
                console.error("ERROR: ", error);
            }
        }
        obtenerDatos();
    }, []);

    

    

  return (
    <div className="list container-fluid">
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
        <SongButton />
      )}
    </div>
  );
}
