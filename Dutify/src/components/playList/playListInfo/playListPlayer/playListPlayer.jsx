import React, { useState } from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { TbArrowsCross } from "react-icons/tb";
import { FaPlay, FaPause } from "react-icons/fa6";
import "./playListPlayerStyle.css";


export default function PlayListPlayer(){
    const [isPlaying, setPlaying] = useState(false);

    const playButtonClickHandler = (e) => {
        setPlaying(!isPlaying);
    }
    const crossButtonClickHandler = (e) => {
    }
    const loopButtonClickHandler = (e) => {
    }

    return(
        <div className="playListPlayerContainer d-flex justify-content-around align-items-center">
            <div className="arrowCross" tabindex="2"><TbArrowsCross className="arrowCrossButton" onClick={crossButtonClickHandler}/></div>
            {
                isPlaying
                ? <div className="playListButtonAnimated" tabindex="1" onClick={playButtonClickHandler}> <FaPause className="play"/> </div>
                : <div className="playListButton" tabindex="1" onClick={playButtonClickHandler}> <FaPlay className="play"/> </div>
            }
            
            <div className="arrowLoop" tabindex="2"><RiLoopLeftFill className="arrowLoopButton" onClick={loopButtonClickHandler}/></div>
        </div>
    );
}