import TopBar from "./components/topBar/topBar";
import "./index.css";
import "./App.css";
import Genres from "./components/locations/genres/genres";
import Lists from "./components/locations/lists/lists";
import Inicio from "./components/locations/inicio/inicio";
import { setAccessToken, getAccessToken } from "./spotifyApi/SpotifyApiCalls";
import {
  createHashRouter,
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import HelpModal from "./components/helpModal/helpModal";
import { useThemeContext } from "./context/ThemeContext";
import { useEffect, useState, createContext, useRef } from "react";
import PlayList from "./components/playList/playList";
import MusicPlayer from "./components/musicPlayer/musicPlayer";
import GenreLists from "./components/locations/genres/genreLists";
import SearchResults from "./components/locations/query/busquedas";
import { setPausedTrack, setTrack } from "./spotifyApi/SongController";
import { useSnackbar } from '@mui/base/useSnackbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Login from "./components/locations/login/login";

export const FeedbackHandlerContext = createContext(1);

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [token, setToken] = useState("");
  const [feedback, setFeedback] = useState("");
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const refContainer = useRef();

  useEffect(() => {

    const currentTrack = JSON.parse(window.sessionStorage.getItem("currentTrack"));
    const currentTime = window.sessionStorage.getItem("currentTrackTime")
    const trackStatus = window.sessionStorage.getItem("trackStatus");

    if(trackStatus === "true") {
      setTrack(currentTrack, currentTime)
    }else if(currentTrack !== null){
      setPausedTrack(currentTrack, currentTime);
    } 
  }, []);

  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URI = "http://localhost:5173/Dutify/inicio";
  const CLIENT_ID = "212f24bfe4124f9d89ee2c341ae96f19";
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

  const router = createBrowserRouter([
    {
      path: '/Dutify',
      element: <Login loginUrl={loginUrl}></Login>,
    },
    {
      path: "/Dutify/inicio",
      element: <Inicio token={token}></Inicio>,
    },
    {
      path: "/Dutify/generos",
      element: <Genres token={token}></Genres>,
    },
    {
      path: "/Dutify/listas",
      element: <Lists token={token}></Lists>,
    },
    {
      path: "/Dutify/generos/listas",
      element: <GenreLists></GenreLists>,
    },
    {
      path: "/Dutify/generos/playlist",
      element: <PlayList />,
    },
    {
      path: "/Dutify/listas/playlist",
      element: <PlayList />,
    },
    {
      path: "/Dutify/busqueda",
      element: <SearchResults />,
    },
  ]);

  const handleClose = () => {
    setFeedback("");
    setOpen(false);
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open,
    autoHideDuration: 2500,
  });

  const changeFeedback = (text) => {
    setFeedback(text);
    setOpen(true);
  };

  const handleKeyUpEvent = (event) =>{

    if ((event.key === "Enter" || event.key === " ") && document.activeElement === refContainer.current) {
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div id={contextTheme} style={{height: '100vh'}} tabIndex={-1} onKeyUp={handleKeyUpEvent} role="application" ref={refContainer}>
        <>
          <FeedbackHandlerContext.Provider value={{changeFeedback}}>
            <div aria-description={feedback} >
              {feedback !== "" ? (
                  <ClickAwayListener onClickAway={onClickAway}>
                    <div className="CustomSnackbar" {...getRootProps()} role="alert">
                      {feedback}
                    </div>
                  </ClickAwayListener>
              ) : null}
            </div>
            <TopBar></TopBar>
            <HelpModal />
            <main>
              <RouterProvider router={router}></RouterProvider>
            </main>
            <footer>
              <MusicPlayer spaceEvent={isPlaying} ></MusicPlayer>
            </footer>
          </FeedbackHandlerContext.Provider>
        </>
    </div>
  );
}

export default App;
