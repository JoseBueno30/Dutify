import React from "react";
import SongList from "../songList/songList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css"



export default function PlayList({token}){
    return(
        <div className="playList d-flex flex-column-reverse flex-xl-row">
            
            <SongList token={token}/>
            <PlayListInfo />
        </div>
    );
}