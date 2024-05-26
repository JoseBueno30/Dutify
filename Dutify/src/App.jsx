import TopBar from "./components/topBar/topBar";
import "./index.css";
import "./App.css";
import Genres from "./components/locations/genres/genres";
import Lists from "./components/locations/lists/lists";
import Inicio from "./components/locations/inicio/inicio";
import { setAccessToken, getAccessToken } from "./spotifyApi/SpotifyApiCalls";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HelpModal from "./components/helpModal/helpModal";
import { useThemeContext } from "./context/ThemeContext";
import { useEffect, useState, createContext } from "react";
import PlayList from "./components/playList/playList";
import MusicPlayer from "./components/musicPlayer/musicPlayer";
import GenreLists from "./components/locations/genres/genreLists";
import SearchResults from "./components/locations/query/busquedas";
import { useSnackbar } from '@mui/base/useSnackbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

export const FeedbackHandlerContext = createContext(1);

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [token, setToken] = useState("");
  const [feedback, setFeedback] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(window.location.href.split("/"));
    let spotifyToken = window.sessionStorage.getItem("token");

    if (!spotifyToken || spotifyToken === "undefined") {
      spotifyToken = getTokenFromUrl().access_token;
      window.sessionStorage.setItem("token", spotifyToken);
      console.log(
        "guardado en sesion " + window.sessionStorage.getItem("token")
      );
    }
    setToken(spotifyToken);
    setAccessToken(spotifyToken);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/inicio" />,
    },
    {
      path: "/inicio",
      element: <Inicio token={token}></Inicio>,
    },
    {
      path: "/generos",
      element: <Genres token={token}></Genres>,
    },
    {
      path: "/listas",
      element: <Lists token={token}></Lists>,
    },
    {
      path: "/Generos/Listas",
      element: <GenreLists></GenreLists>,
    },
    {
      path: "Generos/playlist",
      element: <PlayList />,
    },
    {
      path: "/listas/playlist",
      element: <PlayList />,
    },
    {
      path: "/busqueda",
      element: <SearchResults />,
    },
  ]);

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
  ];

  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes.join(
    "%20"
  )}&show_dialog=true`;

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
    setFeedback(text)
    setOpen(true)
  }

  return (
    <div id={contextTheme} style={{height: '100vh'}}>
      {!token ? (
        <a className="btn btn-success" href={loginUrl}>
          Login
        </a>
      ) : (
        <>
          <FeedbackHandlerContext.Provider value={{changeFeedback}}>
            {feedback !== "" ? (
              <ClickAwayListener onClickAway={onClickAway}>
                <div className="CustomSnackbar" {...getRootProps()}>
                  {feedback}
                </div>
              </ClickAwayListener>
            ) : null}

            <TopBar></TopBar>
            <RouterProvider router={router}></RouterProvider>
            <MusicPlayer></MusicPlayer>
          </FeedbackHandlerContext.Provider>
        </>
      )}
      <HelpModal />
    </div>
  );
}

export default App;
