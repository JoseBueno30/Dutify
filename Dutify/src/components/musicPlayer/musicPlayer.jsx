import "./musicPlayer.css"
import { useState } from "react";

function MusicPlayer() {
  const [playing, swtich] = useState(true);

  const switchPlay = () => {
    swtich(!playing)
  };

  return (
    <>
      <div className="position-absolute bottom-0 start-0 music-bar">
        <div className="music-container">
            <div className="song-container">
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
                <input className="song-bar" type="range"></input>
                <div className="song-buttons">
                    <img src="src\assets\previous-button.svg"></img>
                    {playing ? <img src="src\assets\play-button.svg" onClick={switchPlay}></img> : <img src="src\assets\stop-button.svg" onClick={switchPlay}></img>}
                    <img src="src\assets\next-button.svg"></img>
                </div> 
            </div>
            {/* Barra de Soido */}
            <div className="sound-bar">
                <input type="range"></input>
            </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
