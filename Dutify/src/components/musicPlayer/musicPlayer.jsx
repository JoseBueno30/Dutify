import "./musicPlayer.css"
import { useEffect, useState } from "react";

function MusicPlayer() {
  const [playing, swtich] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const switchPlay = () => {
    swtich(!playing)
  };

  useEffect(() => {
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
      e.style.setProperty('--value', e.value);
      e.style.setProperty('--min', e.min == '' ? '0' : e.min);
      e.style.setProperty('--max', e.max == '' ? '100' : e.max);
      e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }

    function handleResize() {
      setIsSmallScreen(window.innerWidth < 900);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

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
                    {!isSmallScreen ?  <span>Artista</span> : "" }
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
                <img src="src\assets\musicPlayer\sound.svg"></img>
                <input type="range" className="styled-slider slider-progress"></input>
            </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
