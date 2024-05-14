import TopBar from "./components/topBar/topBar";
import "./index.css";
import "./App.css"
import Genres from "./components/locations/genres";
import Lists from "./components/locations/lists";
import { setAccessToken, getAccessToken } from "./spotifyApi/SpotifyApiCalls";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HelpModal from "./components/helpModal/helpModal";
import { useThemeContext } from "./context/ThemeContext";
import { useEffect, useState } from "react";
import "./App.css";
import PlayList from "./components/playList/playList";
import MusicPlayer from "./components/musicPlayer/musicPlayer"

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log(window.location.href);
    let spotifyToken = window.sessionStorage.getItem("token");
        
    if (!spotifyToken || spotifyToken === "undefined"){
       spotifyToken = getTokenFromUrl().access_token;
       window.sessionStorage.setItem("token", spotifyToken);
       console.log("guardado en sesion " + window.sessionStorage.getItem("token"))
    }
    setToken(spotifyToken);
    setAccessToken(spotifyToken);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <></>
    },{
      path: "/inicio",
      element: <></>
    },
    {
      path: "/generos",
      element: <Genres token={token}></Genres>
    },
    {
      path: "/listas",
      element: <Lists token={token}></Lists>
    }
  ])

  const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
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
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-top-read",
    "user-library-read",
  ];

  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes.join(
    "%20"
  )}&show_dialog=true`;

  return (
    <div id={contextTheme}>
      {!token ? (
        <a className="btn btn-success" href={loginUrl}>Login</a>
      ) : (
        <>
          <TopBar></TopBar>
          {/* <RouterProvider router={router}></RouterProvider> */}
          <PlayList playListId={"0DlbfH4tUyObSa59Bb8L85"}/>
          <MusicPlayer></MusicPlayer>
        </>
      )}
      <HelpModal/>
    </div>
  );
}

export default App;
