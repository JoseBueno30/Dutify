import "./musicPlayer.css"
function MusicPlayer() {
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
                    <img src="src\assets\play-button.svg"></img>
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
