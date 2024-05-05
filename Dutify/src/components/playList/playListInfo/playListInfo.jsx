import React from "react";
import "./playListInfoStyle.css"
import PlayListPlayer from "./playListPlayer/playListPlayer";


export default function PlayListInfo(){
    return(
        <div className="playListInfoContainer d-flex flex-column container-fluid">
            <p className="playListName">ListaDeReproduccion</p>
            <div className="playListImage">
                <image> </image>
            </div>
            <div className="playListInfo d-flex align-items-stretch justify-content-evenly">
                <p>X canciones</p>
                <p>mm:ss</p>
            </div>
            <PlayListPlayer className="playListPlayer"/>
        </div>
    );
}