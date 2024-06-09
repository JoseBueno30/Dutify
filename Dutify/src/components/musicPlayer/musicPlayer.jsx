import {
  getDuration,
  isTrackPlaying,
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
import {
  IoPlayCircleOutline,
  IoPlaySkipBackCircleOutline,
  IoPlaySkipForwardCircleOutline,
  IoPauseCircleOutline,
} from "react-icons/io5";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

function MusicPlayer({spaceEvent}) {
  const [playing, change] = useState(
    window.sessionStorage.getItem("trackStatus") === "true"
  );
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
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
      setIsSmallScreen(window.innerWidth < 600);
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

    console.log(window.sessionStorage.getItem("trackStatus"))
    
    if(window.sessionStorage.getItem("trackStatus")!==null){
      switchPlay();
    }
    

    setvolumeValue(trackVolume);

    return () => {
      __removeEvents();
      window.removeEventListener("resize", handleResize);
    };
  }, [spaceEvent]);

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

  const playButtonKeyupHandler = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      switchPlay();
    }
  };

  const test = (event) => {
    console.log("ASASDDASD")
  }

  return (
    <>
      <div className="sticky-bottom music-bar " onKeyUp={test} tabIndex={0}>
        <div className="music-container">
          {/* Información de la cancion */}
          <div className="song-container">
            {/* Imagen de Cancion */}
            {track ? (
              <img
                className="simulate-image"
                src={track.album.images[2].url}
                alt="Imagen de la canción actual"
              ></img>
            ) : (
              <div className="simulate-image"></div>
            )}
            {/* Texto de Artista */}
            <div
              className="artist-container"
              aria-label="Nombre y autor de la cancion actual"
              tabIndex={0}
            >
              <span className="name" aria-description="Canción actual: ">
                {track ? track.name : "..."}
              </span>
              {!isSmallScreen ? (
                <>
                  <br />
                  <span className="artist-text" aria-description="Artista: ">
                    {track ? track.artists[0].name : "..."}
                  </span>
                </>
              ) : (
                <></>
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
              aria-label="Barra de reproducción"
            ></input>
            <div className="timer-buttons-wrapper">
              {/* Temporizador */}

              <span
                aria-description={
                  "Marca de tiempo actual: " +
                  (track && currentTime
                    ? currentTime.toString().charAt(0) + " segundos"
                    : "indefinido")
                }
                tabIndex={0}
              >
                <div aria-hidden="true">
                  {track && currentTime
                    ? currentTime > 9
                      ? "00:" + currentTime.substring(0, 2)
                      : "00:0" + currentTime.charAt(0)
                    : "mm:ss"}
                </div>
              </span>
              {/* Bottones de reproducción */}
              <div className="song-buttons">
                <button>
                  <IoPlaySkipBackCircleOutline
                    size={35}
                    className="side-button"
                    title="Canción anterior"
                    onClick={handlePreviousTrackClick}
                  />
                </button>

                <button
                  onClick={switchPlay}
                  onKeyUp={playButtonKeyupHandler}
                  className="play-button"
                  title={
                    isTrackPlaying() ? "Pausar canción" : "Reproducir canción"
                  }
                >
                  {!isTrackPlaying() ? (
                    <IoPlayCircleOutline size={35} />
                  ) : (
                    <IoPauseCircleOutline size={35} />
                  )}
                </button>
                <button>
                  <IoPlaySkipForwardCircleOutline
                    size={35}
                    className="side-button"
                    title="Canción siguiente"
                    onClick={handleNextTrackClick}
                  />
                </button>
              </div>
              {/* Temporizador */}
              <span
                tabIndex={0}
                aria-description={
                  "Marca de tiempo total: " +
                  (track ? "30 segundos" : "indefinido")
                }
              >
                <div aria-hidden="true">{track ? "00:30" : "mm:ss"}</div>
              </span>
            </div>
          </div>

          {/* Barra de Soido */}
          <div className="sound-bar">
            <button
              className="volume-button"
              onClick={switchVolume}
              id="volumeButton"
              title={volumeValue == 0 ? "Activar volúmen" : "Silenciar volúmen"}
            >
              {volumeValue == 0 ? (
                <FaVolumeMute size={25} />
              ) : (
                <FaVolumeUp size={25} />
              )}
            </button>
            <input
              id="volume-bar"
              aria-label="Barra de volumen"
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
