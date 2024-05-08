import "./musicPlayer.css"
import { useEffect, useState } from "react";

function MusicPlayer() {
  const [playing, change] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [rangeValue, setRangeValue] = useState(50);
  const [lastRangevalue, setLastRangeValue] = useState(0);

  const handleChange = (event) => {
    setRangeValue(parseInt(event.target.value));
  }

  const switchPlay = () => {
    change(!playing)
  };

  const switchVolume = () => {
    if(rangeValue != 0) {
        setLastRangeValue(rangeValue)
        setRangeValue(0);   
    } else {
        setRangeValue(lastRangevalue);
    }
  }

  const fillRangeInputs = () => {
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min == '' ? '0' : e.min);
        e.style.setProperty('--max', e.max == '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
      }
  }

  useEffect(() => {

    function handleResize() {
      setIsSmallScreen(window.innerWidth < 900);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  useEffect(() => {
    fillRangeInputs();

  }, [rangeValue]);

  return (
    <>
      <div className="position-absolute bottom-0 start-0 music-bar">
        <div className="music-container">
            {/* Información de la cancion */}
            <div className="song-container">
                {/* Imagen de Cancion */}
                <div className="simulate-image"></div>
                {/* Texto de Artista */}
                <div className="artist-container">
                    <span>lkhkhkjhkhkhkjhkhgkdhfgkdgfjh</span><br/>
                    {!isSmallScreen ?  <span className="artist-text">Artista</span> : "" }
                </div>
            </div>
            {/* Barra de reproducción */}
            <div className="progresion-bar">
                <input className="styled-slider slider-progress" type="range"></input>
                <div className="timer-buttons-wrapper">
                    {/* Temporizador */}
                    <span>mm:ss</span>
                    {/* Bottones de reproducción */}
                    <div className="song-buttons">
                        <img className="side-button" src="src\assets\musicPlayer\previous-button.svg"></img>
                        {playing ? <img className="play-button" src="src\assets\musicPlayer\play-button.svg" onClick={switchPlay}></img> : <img className="play-button" src="src\assets\musicPlayer\stop-button.svg" onClick={switchPlay}></img>}
                        <img className="side-button" src="src\assets\musicPlayer\next-button.svg"></img>
                    </div>
                    {/* Temporizador */}
                    <span>mm:ss</span>
                </div> 
            </div>
            
            {/* Barra de Soido */}
            <div className="sound-bar">
                {rangeValue == 0 ? <img className="volume-button" onClick={switchVolume} src="src\assets\musicPlayer\mute.svg"></img> : <img className="volume-button" onClick={switchVolume} src="src\assets\musicPlayer\sound.svg"></img>}
                <input type="range" className="styled-slider slider-progress" min={0} max={100} value={rangeValue} onChange={handleChange}></input>
            </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
