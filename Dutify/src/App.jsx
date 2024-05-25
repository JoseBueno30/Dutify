import TopBar from "./components/topBar/topBar";
import "./index.css";
import "./App.css"
import Genres from "./components/locations/genres/genres";
import Lists from "./components/locations/lists/lists";
import Inicio from "./components/locations/inicio/inicio";
import { setAccessToken, getAccessToken } from "./spotifyApi/SpotifyApiCalls";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import HelpModal from "./components/helpModal/helpModal";
import { useThemeContext } from "./context/ThemeContext";
import { useEffect, useState } from "react";
import PlayList from "./components/playList/playList";
import MusicPlayer from "./components/musicPlayer/musicPlayer"
import GenreLists from "./components/locations/genres/genreLists";
import SearchResults from "./components/locations/query/busquedas";
import { setTrack } from "./spotifyApi/SongController";

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log(window.location.href.split("/"));
    let spotifyToken = window.sessionStorage.getItem("token");
        
    if (!spotifyToken || spotifyToken === "undefined"){
       spotifyToken = getTokenFromUrl().access_token;
       window.sessionStorage.setItem("token", spotifyToken);
       console.log("guardado en sesion " + window.sessionStorage.getItem("token"))
    }

    setToken(spotifyToken);
    setAccessToken(spotifyToken);

    const currentTrack = JSON.parse(window.sessionStorage.getItem("currentTrack"));
    const currentTime = window.sessionStorage.getItem("currentTrackTime")
    const trackStatus = window.sessionStorage.getItem("trackStatus");

    if(trackStatus === "true") {
      console.log("no deberia entrar si es false")
      setTrack(currentTrack, currentTime)
    } 
    
  }, []);



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/inicio"/>
    },
    {
      path: "/inicio",
      element: <Inicio token={token}></Inicio>
    },
    {
      path: "/generos",
      element: <Genres token={token}></Genres>
    },
    {
      path: "/listas",
      element: <Lists token={token}></Lists>
    },
    {
      path: "/Generos/Listas",
      element: <GenreLists></GenreLists>
    },
    {
      path: "Generos/playlist",
      element: <PlayList/>
    },
    {
      path: "/listas/playlist",
      element: <PlayList/>
    },
    {
      path: "/busqueda",
      element: <SearchResults/>
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
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-top-read",
    "user-library-read",
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state",
    "user-read-playback-state"
  ];

  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes.join(
    "%20"
  )}&show_dialog=true`;

  return (
    <div id={contextTheme} style={{height: '100vh'}}>
      {!token ? (
        <a className="btn btn-success" href={loginUrl}>Login</a>
      ) : (
        <>
          <TopBar></TopBar>
          <RouterProvider router={router}></RouterProvider>
          <MusicPlayer></MusicPlayer>
        </>
      )}
      <HelpModal/>
    </div>
  );
}

export default App;
