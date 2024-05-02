import React from "react";
import SongList from "../songList/songList";
import PlayListInfo from "./playListInfo/playListInfo";


export default function PlayList(){
    return(
        <div className="d-flex justify-content-evenly">
            <SongList/>
            <PlayListInfo/>
        </div>
    );
}