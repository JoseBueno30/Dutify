import {
  getDuration,
  nextQueueSong,
  pauseTrack,
  playTrack,
  previousQueueSong,
  queueEmitter,
  setTrackCurrentTime,
  setVolume,
} from "../../spotifyApi/SongController";
import "./musicPlayer.css";
import { useEffect, useState } from "react";

function MusicPlayer() {
  const [playing, change] = useState(
    window.sessionStorage.getItem("trackStatus") === "true"
  );
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [progressionValue, setProgressionValue] = useState(0);
  const [volumeValue, setvolumeValue] = useState(50);
  const [lastVolumeValue, setLastVolumeValue] = useState(0);
  const [track, setTrack] = useState();
  const [currentTime, setCurrentTime] = useState();

  const switchPlay = () => {
    if (playing) {
      pauseTrack();
      console.log("pausa");
    } else {
      console.log("play");
      playTrack();
    }
  };

  const handlePlayToPause = () => {
    //console.log("cambiando status... era " + playing)
    change(false);
  };

  const handlePauseToPlay = () => {
    change(true);
  };

  const handleNextTrackClick = () => {
    nextQueueSong();
  };

  const handlePreviousTrackClick = () => {
    previousQueueSong();
  };

  const handleTrackVolume = (e) => {
    setLastVolumeValue(volumeValue);
    const volume = e.currentTarget.value;
    setvolumeValue(volume);
    setVolume(volume);
  };

  const switchVolume = () => {
    if (volumeValue != 0) {
      setLastVolumeValue(volumeValue);
      setvolumeValue(0);
      setVolume(0);
    } else {
      setvolumeValue(lastVolumeValue);
      setVolume(lastVolumeValue);
    }
  };

  const fillRangeInputs = () => {
    for (let e of document.querySelectorAll(
      'input[type="range"].slider-progress'
    )) {
      e.style.setProperty("--value", e.value);
      e.style.setProperty("--min", e.min == "" ? "0" : e.min);
      e.style.setProperty("--max", e.max == "" ? "100" : e.max);
      e.addEventListener("input", () =>
        e.style.setProperty("--value", e.value)
      );
    }
  };

  const loadTrackInfo = () => {
    const trackSession = JSON.parse(
      window.sessionStorage.getItem("currentTrack")
    );
    console.log(trackSession);
    setTrack(trackSession);
    setCurrentTime(0);
  };

  const handleCurrentTime = () => {
    const newCurrentTime = window.sessionStorage.getItem("currentTrackTime");
    setCurrentTime(newCurrentTime);
    const range = document.getElementById("track-progression");
    range.value = (newCurrentTime * 100) / 29.75;
    setProgressionValue(range.value);
  };

  const handleCurretTimeChange = (e) => {
    const newCurrentTime = e.currentTarget.value;
    setProgressionValue(newCurrentTime);
    setCurrentTime(((newCurrentTime * 29.75) / 100).toString());
    setTrackCurrentTime((newCurrentTime * 29.75) / 100);
  };

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 901);
    }
    const trackSession = JSON.parse(
      window.sessionStorage.getItem("currentTrack")
    );
    setTrack(trackSession);
    __addEvents();
    window.addEventListener("resize", handleResize);

    let trackVolume =
      window.sessionStorage.getItem("volume") === null
        ? 50
        : parseFloat(window.sessionStorage.getItem("volume")) * 100;

    setvolumeValue(trackVolume);

    return () => {
      __removeEvents();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const __addEvents = () => {
    queueEmitter.on("newTrack", loadTrackInfo);
    queueEmitter.on("timeUpdate", handleCurrentTime);
    queueEmitter.on("trackStatusTrue", handlePauseToPlay);
    queueEmitter.on("trackStatusFalse", handlePlayToPause);
  };

  const __removeEvents = () => {
    queueEmitter.off("newTrack", loadTrackInfo);
    queueEmitter.off("timeUpdate", handleCurrentTime);
    queueEmitter.off("trackStatusTrue", handlePauseToPlay);
    queueEmitter.off("trackStatusFalse", handlePlayToPause);
  };

  useEffect(() => {
    fillRangeInputs();
  }, [progressionValue, volumeValue]);

  return (
    <>
      <div className="fixed-bottom music-bar ">
        <div className="music-container">
          {/* Información de la cancion */}
          <div className="song-container">
            {/* Imagen de Cancion */}
            {track ? (
              <img
                className="simulate-image"
                src={track.album.images[2].url}
              ></img>
            ) : (
              <div className="simulate-image"></div>
            )}
            {/* Texto de Artista */}
            <div className="artist-container">
              <span>{track ? track.name : "..."}</span>
              <br />
              {!isSmallScreen ? (
                <span className="artist-text">
                  {track ? track.artists[0].name : "..."}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Barra de reproducción */}
          <div className="progresion-bar">
            <input
              id="track-progression"
              className="styled-slider slider-progress"
              type="range"
              value={progressionValue}
              onChange={handleCurretTimeChange}
            ></input>
            <div className="timer-buttons-wrapper">
              {/* Temporizador */}
              <span>
                {track && currentTime
                  ? currentTime > 9
                    ? "00:" + currentTime.substring(0, 2)
                    : "00:0" + currentTime.charAt(0)
                  : "mm:ss"}
              </span>
              {/* Bottones de reproducción */}
              <div className="song-buttons">
                <img
                  className="side-button"
                  src="/assets/musicPlayer/previous-button.svg"
                  onClick={handlePreviousTrackClick}
                ></img>
                {playing ? (
                  <img
                    className="play-button"
                    src="/assets/musicPlayer/stop-button.svg"
                    onClick={switchPlay}
                  ></img>
                ) : (
                  <img
                    className="play-button"
                    src="/assets/musicPlayer/play-button.svg"
                    onClick={switchPlay}
                  ></img>
                )}
                <img
                  className="side-button"
                  src="/assets/musicPlayer/next-button.svg"
                  onClick={handleNextTrackClick}
                ></img>
              </div>
              {/* Temporizador */}
              <span>{track ? "00:30" : "mm:ss"}</span>
            </div>
          </div>

          {/* Barra de Soido */}
          <div className="sound-bar">
            {volumeValue == 0 ? (
              <img
                className="volume-button"
                onClick={switchVolume}
                src="/assets/musicPlayer/mute.svg"
              ></img>
            ) : (
              <img
                className="volume-button"
                onClick={switchVolume}
                src="/assets/musicPlayer/sound.svg"
              ></img>
            )}
            <input
              id="volume-bar"
              type="range"
              className="styled-slider slider-progress"
              min={0}
              max={100}
              value={volumeValue}
              onChange={handleTrackVolume}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
