import React, { useEffect, useState } from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { TbArrowsCross } from "react-icons/tb";
import { FaPlay, FaPause } from "react-icons/fa6";
import "./playListPlayerStyle.css";
import { pauseTrack } from "../../../../spotifyApi/SongController";


export default function PlayListPlayer({queueFunction, playListId, isPlaying, setPlaying}){
    

    const playButtonClickHandler = (e) => {
        if(!isPlaying) queueFunction();
        else pauseTrack();  
        setPlaying(!isPlaying);
    }
    const crossButtonClickHandler = (e) => {
    }
    const loopButtonClickHandler = (e) => {
    }

    useEffect(()=>{
        const playlistPlaying = sessionStorage.getItem("playlistPlaying");
        setPlaying(playlistPlaying === playListId);
    },[])

    return(
        <div className="playListPlayerContainer d-flex justify-content-around align-items-center">
            <div className="arrowCross" tabIndex={0}><TbArrowsCross className="arrowCrossButton" onClick={crossButtonClickHandler}/></div>
            {
                isPlaying
                ? <div className="playListButtonAnimated" tabIndex={0} onClick={playButtonClickHandler}> <FaPause className="play"/> </div>
                : <div className="playListButton" tabIndex={0} onClick={playButtonClickHandler}> <FaPlay className="play"/> </div>
            }
            
            <div className="arrowLoop" tabIndex={0}><RiLoopLeftFill className="arrowLoopButton" onClick={loopButtonClickHandler}/></div>
        </div>
    );
}