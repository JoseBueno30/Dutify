import React, { useEffect } from "react";
import { useState } from "react";
import SongList from "../songList/songList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css"
import { SpotifyWebAPI } from "../../SpotifyWebAPI/SpotifyWebAPI";



export default function PlayList({token}){
    const [topTracks, setTopTracks] = useState("");

    useEffect(()=>{
        async function obtenerDatos() {
            try{
                const spotify = new SpotifyWebAPI(token);
                const tracks = await spotify.getTopTracks(20);
                setTopTracks(tracks);
            }catch(error){
                console.error("ERROR: ", error);
            }
        }
        obtenerDatos();
    }, []);

    return(
        <div className="playList d-flex flex-column flex-xl-row-reverse">
            <PlayListInfo />
            <SongList token={token} tracks={topTracks}/>
        </div>
    );
}