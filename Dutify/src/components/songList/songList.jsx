import React, { useEffect } from "react";
import { useState } from "react";
import SongButton from "../songButton/songButton";
import "./songListStyle.css";
import { MdOutlineBroadcastOnPersonal } from "react-icons/md";

export default function SongList({token}) {
    const [topTracks, setTopTracks] = useState("");

    useEffect(()=>{
        async function obtenerDatos() {
            try{
                const tracks = await getTopTracks();
                setTopTracks(tracks);
                console.log(tracks);
            }catch(error){
                console.error("ERROR: ", error);
            }
        }
        obtenerDatos();
    }, []);

    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
    
    async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
        });
        return await res.json();
    }

    async function getTopTracks() {
        // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
        return (
        await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=50", "GET")
        ).items;
    }

    async function clickTest() {
        const tracks = await getTopTracks();
        setTopTracks(tracks);
        console.log(tracks);
    }

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
