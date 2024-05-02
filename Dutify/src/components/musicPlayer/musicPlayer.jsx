import "./musicPlayer.css"
import { useEffect, useState } from "react";

function MusicPlayer() {
  const [playing, swtich] = useState(true);

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
  }, []);

  return (
    <>
      <div className="position-absolute bottom-0 start-0 music-bar">
        <div className="music-container">
            <div className="song-container">
              {/* TODO: reemplazar por información real de la canción */}
                {/* Imagen de Cancion */}
                <div className="simulate-image"></div>
                {/* Texto de Artista */}
                <div className="artist-container">
                    <span>Nombre</span><br></br>
                    <span>Artista</span>
                </div>
            </div>
            {/* Barra de repreducción */}
            <div className="progresion-bar">
                <input className="styled-slider slider-progress" type="range"></input>
                <div className="song-buttons">
                    <img onPointerOver={} src="src\assets\previous-button.svg"></img>
                    {playing ? <img src="src\assets\play-button.svg" onClick={switchPlay}></img> : <img src="src\assets\stop-button.svg" onClick={switchPlay}></img>}
                    <img src="src\assets\next-button.svg"></img>
                </div> 
            </div>
            {/* Barra de Soido */}
            <div className="sound-bar">
                <input type="range" className="styled-slider slider-progress"></input>
            </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
