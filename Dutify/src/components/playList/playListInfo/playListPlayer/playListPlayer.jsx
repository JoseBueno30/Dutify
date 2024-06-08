import React, { useEffect, useState } from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { TbArrowsCross } from "react-icons/tb";
import { FaPlay, FaPause } from "react-icons/fa6";
import "./playListPlayerStyle.css";
import {
  pauseTrack,
  setLoopTrack,
  setRandomQueue,
} from "../../../../spotifyApi/SongController";
import { queueEmitter } from "../../../../spotifyApi/SongController";

export default function PlayListPlayer({
  queueFunction,
  playListId,
  isPlaying,
  setPlaying,
}) {
  const [loopStatus, setLoopStatus] = useState(
    window.sessionStorage.getItem("loop") === "true"
  );
  const [randomStatus, setRandomStatus] = useState(
    window.sessionStorage.getItem("random") === "true"
  );

  const playButtonClickHandler = (e) => {
    if (!isPlaying) queueFunction();
    else pauseTrack();
    setPlaying(!isPlaying);
  };
  const crossButtonClickHandler = (e) => {
    setRandomStatus(!randomStatus);
    setRandomQueue();
  };
  const loopButtonClickHandler = (e) => {
    setLoopStatus(!loopStatus);
    setLoopTrack();
  };

  const crossButtonKeydownHandler = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      crossButtonClickHandler();
    }
  };

  const playButtonKeydownHandler = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      playButtonClickHandler();
    }
  };

  const loopButtonKeydownHandler = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      loopButtonClickHandler();
    }
  };

  useEffect(() => {
    const random = window.sessionStorage.getItem("random") === "true";
    const loop = window.sessionStorage.getItem("loop") === "true";
    console.log("RANDOM: " + random);
    setRandomStatus(random);
    setLoopStatus(loop);
    const playlistPlaying = window.sessionStorage.getItem("playlistPlaying");
    const trackStatus = window.sessionStorage.getItem("trackStatus");

    setPlaying(playlistPlaying === playListId && trackStatus === "true");
  }, []);

  return (
    <div className="playListPlayerContainer d-flex justify-content-around align-items-center">
      <div
        id="crossButton"
        className={randomStatus ? "arrowCrossActive" : "arrowCross"}
        tabIndex={0}
        onClick={crossButtonClickHandler}
        onKeyDown={crossButtonKeydownHandler}
        title={(randomStatus ? "Desactivar " : "Activar ") + "reproducción aleatoria"}
      >
        <TbArrowsCross className="arrowCrossButton" />
      </div>

      <div
        id="playButton"
        className={isPlaying ? "playListButtonAnimated" : "playListButton"}
        tabIndex={0}
        onClick={playButtonClickHandler}
        onKeyDown={playButtonKeydownHandler}
        title={(isPlaying ? "Pausar" : "Reproducir") + " playlist"  }
      >
        {isPlaying ? <FaPause className="play" /> : <FaPlay className="play" />}
      </div>

      <div
        id="loopButton"
        className={loopStatus ? "arrowLoopActive" : "arrowLoop"}
        tabIndex={0}
        onClick={loopButtonClickHandler}
        onKeyDown={loopButtonKeydownHandler}
        title={(loopStatus ? "Desactivar " : "Activar ") + "reproducción en bucle"}
      >
        <RiLoopLeftFill className="arrowLoopButton"/>
      </div>
    </div>
  );
}
