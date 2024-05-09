import SongList from "./components/songList/songList";
import TopBar from "./components/topBar/topBar";
import { useThemeContext } from "./context/ThemeContext";
import { useEffect, useState } from "react";
import "./App.css";
import PlayList from "./components/playList/playList";
import MusicPlayer from "./components/musicPlayer/musicPlayer";
import CardsGrid from "./components/cardsGrid/cardsGrid";

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();

  const [token, setToken] = useState("");


  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token;

    if (spotifyToken) {
      setToken(spotifyToken);
    }
  }, []);

  const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };

  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URI = "http://localhost:5173/";
  const CLIENT_ID = "d552724bc56f4c16a1851eec670e094f";
  const RESPONSE_TYPE = "token";

  const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
    "app-remote-control",
    "playlist-modify-public",
    "user-top-read",
    "user-library-read",
  ];

  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes.join("%20")}&show_dialog=true`;

  return (
    <div id={contextTheme}>
      {!token ? (
        <a href={loginUrl}>Login to Spotify</a>
      ) : (
        <>
          <TopBar/>
            <PlayList token={token}/>
          <MusicPlayer/>
        </>
      )}
    </div>
  );
}

export default App;
