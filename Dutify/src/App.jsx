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
export const PageHandlerContext = createContext(2);

function App() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [feedback, setFeedback] = useState("");
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const refContainer = useRef();

  const URL_BASE = "https://josebueno30.github.io/Dutify/"

  const [page, changePage] = useState((location.href===URL_BASE || location.href.length>70)?"/":window.sessionStorage.getItem("page"));
  const [playlistId, setPlaylistId] = useState(window.sessionStorage.getItem("playlistId"));
  const [genre, setGenre] = useState(window.sessionStorage.getItem("genre"));
  const [searchQuery, setSearchQuery] = useState(window.sessionStorage.getItem("searchQuery"));
  const [reload,setReload] = useState();


  const handleHashChange = (event) => {
    console.log(event.newURL)
    let newPage = event.newURL.replace(URL_BASE + '#', '');
    window.sessionStorage.setItem("page", "/" + newPage);
    changePage("/" + newPage);
  }

  useEffect(() =>{
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };

  }, [reload]);


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
  const REDIRECT_URI = URL_BASE;
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

  const updateSearchQuery = (query, playlistId) => {
    setSearchQuery(query);
    setPlaylistId(playlistId);
    setPage("busqueda")
    setReload(Math.random);
  }

  const setPage = (page) => {
    console.log("AAA")
    window.sessionStorage.setItem("page", "/" + page)
    let stateObj = { id: "100" };
    window.history.pushState(stateObj, page, "#"+page);
    changePage("/"+page);
  }

  const pageRender = () => {
    let pageRender;
    switch (page) {
      case "/":
        pageRender = <Login loginUrl={loginUrl}></Login>;
        break;
      case "/inicio":
        pageRender = <Inicio></Inicio>;
        window.sessionStorage.setItem("page", page)
        break;
      case "/generos":
        pageRender = <Genres></Genres>;
        window.sessionStorage.setItem("page", page)
      break;
      case "/listas":
        pageRender = <Lists></Lists>;
        window.sessionStorage.setItem("page", page)
      break;
      case "/generos/listas":
        pageRender = <GenreLists genre={genre}></GenreLists>;
        window.sessionStorage.setItem("page", page)
        window.sessionStorage.setItem("genre", genre)
      break;
      case "/playlist":
        pageRender = <PlayList playlistId = {playlistId}/>
        window.sessionStorage.setItem("page", page)
        window.sessionStorage.setItem("playlistId", playlistId)
      break;
      case "/busqueda":
        pageRender = <SearchResults searchQuery={searchQuery} playlistId={playlistId}/>
        window.sessionStorage.setItem("page", page)
        window.sessionStorage.setItem("searchQuery", searchQuery)
        window.sessionStorage.setItem("playlistId", playlistId)
      break;
      default:
        break;
    }
    return pageRender;
  }

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
        <PageHandlerContext.Provider value={{page, setPage, setPlaylistId, setReload, updateSearchQuery, setGenre}}>
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
              {pageRender()}
            </main>
            <footer>
              <MusicPlayer spaceEvent={isPlaying} ></MusicPlayer>
            </footer>
          </FeedbackHandlerContext.Provider>
        </PageHandlerContext.Provider>
    </div>
  );
}

export default App;
