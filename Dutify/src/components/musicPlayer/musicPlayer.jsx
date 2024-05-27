import "./musicPlayer.css";
import { useEffect, useState } from "react";
import {
  IoPlayCircleOutline,
  IoPlaySkipBackCircleOutline,
  IoPlaySkipForwardCircleOutline,
  IoPauseCircleOutline,
} from "react-icons/io5";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

function MusicPlayer() {
  const [playing, change] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [rangeValue, setRangeValue] = useState(50);
  const [lastRangevalue, setLastRangeValue] = useState(0);

  const handleChange = (event) => {
    setRangeValue(parseInt(event.target.value));
  };

  const switchPlay = () => {
    change(!playing);
  };

  const switchVolume = () => {
    if (rangeValue != 0) {
      setLastRangeValue(rangeValue);
      setRangeValue(0);
    } else {
      setRangeValue(lastRangevalue);
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

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 901);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fillRangeInputs();
  }, [rangeValue]);

  return (
    <>
      <div className="fixed-bottom music-bar ">
        <div className="music-container">
          {/* Información de la cancion */}
          <div className="song-container">
            {/* Imagen de Cancion */}
            <div className="simulate-image"></div>
            {/* Texto de Artista */}
            <div className="artist-container" tabIndex={0}>
              <span>lkhkhkjhkhkhkjhkhgkdhfgkdgfjh</span>
              <br />
              {!isSmallScreen ? (
                <span className="artist-text">Artista</span>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Barra de reproducción */}
          <div className="progresion-bar">
            <input
              className="styled-slider slider-progress"
              type="range"
              aria-label="Barra de reproducción"
            ></input>
            <div className="timer-buttons-wrapper">
              {/* Temporizador */}
              <span>mm:ss</span>
              {/* Bottones de reproducción */}
              <div className="song-buttons">
                <button>
                  <IoPlaySkipBackCircleOutline
                    size={35}
                    className="side-button"
                    title="Canción anterior"
                  />
                </button>
                <button onClick={switchPlay} className="play-button">
                  {playing ? (
                    <IoPlayCircleOutline size={35} title="Reproducir canción"/>
                  ) : (
                    <IoPauseCircleOutline size={35} title="Pausar canción"/>
                  )}
                </button>
                <button>
                  <IoPlaySkipForwardCircleOutline
                    size={35}
                    className="side-button"
                    title="Canción siguiente"
                  />
                </button>
              </div>
              {/* Temporizador */}
              <span>mm:ss</span>
            </div>
          </div>

          {/* Barra de Soido */}
          <div className="sound-bar">
            <button className="volume-button" onClick={switchVolume} id="volumeButton" title="Cambiar volúmen">
              {rangeValue == 0 ? (
                <FaVolumeMute size={25} />
              ) : (
                <FaVolumeUp size={25} />
              )}
            </button>
            <input
              aria-label="Volume Range"
              type="range"
              className="styled-slider slider-progress"
              id="volumeRange"
              min={0}
              max={100}
              value={rangeValue}
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
