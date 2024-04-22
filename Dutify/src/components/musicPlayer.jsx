import "./styles/musicPlayer.css"
function MusicPlayer() {
  return (
    <>
    <div className="progress" style={{width: "100vw"}}>
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "75vw"}}></div>
    </div>
    </>
  );
}

export default MusicPlayer;
