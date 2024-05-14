import React from "react";
import SongList from "../songList/songList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css"



export default function PlayList({token}){
    return(
        <div className="playList d-flex flex-column flex-xl-row-reverse">
            <PlayListInfo />
            <SongList token={token}/>
        </div>
    );
}