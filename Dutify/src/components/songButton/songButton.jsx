import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FaEllipsisVertical, FaPlay, FaPause } from "react-icons/fa6";
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuDivider,
  FocusableItem,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useThemeContext } from "../../context/ThemeContext";
import "./songButtonStyle.css";
import {
  addTrackToFavorites,
  addTrackToPlayList,
  removeTrackFromPlayList,
} from "../../spotifyApi/SpotifyApiCalls";
import { useSnackbar } from "@mui/base/useSnackbar";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { FaPlus } from "react-icons/fa";
import { TracksHandlersContext } from "../trackList/trackList";
import { FeedbackHandlerContext } from "../../App";
import { queueEmitter, setQueueIndex, setSingleTrack } from "../../spotifyApi/SongController";

export default function SongButton({enPlaylist, track, index, loadQueue, playlistId, setPlaying, enableAddButton=false}) {
  const [feedback, setFeedback] = useState("");
  // const [isPlaying, setPlaying] = useState(false);

  // console.log(track);
  const handleClose = () => {
    setFeedback("");
  };

  useEffect(() => {

    function handleResize() {
        setIsSmallScreen(window.innerWidth < 750);
      }
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
}, []);

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    feedback,
    autoHideDuration: 5000,
  });

  const timeMIN = Math.trunc(track.duration_ms / 60000);
  const seg = Math.trunc((track.duration_ms % 60000) / 1000);
  const timeMS = seg < 10 ? "0" + seg : seg;

  const songClickHandler = (e) => {
    const id = e.currentTarget.id;
    const playlistPlaying = window.sessionStorage.getItem("playlistPlaying");
    if(enPlaylist && playlistId === playlistPlaying){   
      console.log("Reproduciendo misma playlist...");
      setQueueIndex(index);
    }else if(enPlaylist){
      console.log("Reproduciendo playlist nueva...");
      loadQueue();
      setQueueIndex(index);
      setPlaying(true);
    }else{
      console.log(track.preview_url);
      setSingleTrack(track);
    }
    queueEmitter.emit("trackStatusPlayerChanged")
  };

  return (
    <>
      <div
        title={"Reproducir " + track.name}
        tabIndex={0}
        id={track.id}
        className="songButton"
        onDoubleClick={songClickHandler}
      >
        <div className="playContainer" onClick={songClickHandler}>
          <div
            className="songPlayButton"
            style={
              track.album.images[2] !== undefined
                ? { backgroundImage: "url(" + track.album.images[2].url + ")" }
                : {}
            }
          >
            {" "}
            <FaPlay className="playButton" />{" "}
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="nameAuthorContainer col d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
              <div title={track.name} className="name">
                {track.name}
              </div>
              <div title={track.artists[0].name} className="author">
                {track.artists[0].name}
              </div>
            </div>
            <div title={track.album.name} className="album col-2 ">
              {track.album.name}
            </div>
            <div
              title={"Duración"}
              className="time col-3 col-md-2 d-flex justify-content-center"
            >
              {timeMIN}:{timeMS}
            </div>

            {enableAddButton && playlistId ? <button className="col-1 btn-add d-flex justify-content-center" onClick={listClickHandler}>{isSmallScreen ? <FaPlus /> : "Añadir"}</button> : <></>}


            <div className="col-md-1 col-2 d-flex justify-content-center">
              <Options
                track={track}
                index={index}
              />
            </div>
          </div>
        </div>
      </div>
      {feedback !== "" ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <div className="CustomSnackbar" {...getRootProps()}>
            {feedback}
          </div>
        </ClickAwayListener>
      ) : null}
    </>
  );
}

function Options({track, index}){
    
  const addTrackToPlaylist = useContext(TracksHandlersContext).handleAddTrackToPlayList;
  const removeTrackFromPlaylist = useContext(TracksHandlersContext).handleRemoveTrackFromPlaylist;
  const addTrackToFavorites = useContext(TracksHandlersContext).handleAddTrackToFavorites;
  const userPlaylists = useContext(TracksHandlersContext).userPlaylists;
  const playlistId = useContext(TracksHandlersContext).playlistId;
  const owned = useContext(TracksHandlersContext).owned;

  const listClickHandler = (playlistId) => {
      addTrackToPlaylist(track, playlistId);
  }
  
  const eliminarClickHandler = () => {
      removeTrackFromPlaylist(track, index);
  }
  
  const favoritesClickHandler = () => {
      addTrackToFavorites(track);
  }

  const menuItemClassName = ({ hover }) =>
      hover ? 'menuItemHover' : 'menuItem';

  return(
      <Menu 
          menuButton={<MenuButton tabIndex={0} title="Opciones" className={"optionsButton"}><FaEllipsisVertical  className="options"/></MenuButton>} 
          menuClassName="optionsMenu"
          viewScroll="close"
          position="auto"
          transition>
                              <MenuItem tabIndex={"0"} className={menuItemClassName} title={"Añadir a canciones favoritas"} onClick={() => favoritesClickHandler()}><button>Añadir a canciones favoritas</button></MenuItem>
                              {playlistId && owned?
                              <MenuItem tabIndex={"0"} className={menuItemClassName} title={"Eliminar de la playlist"} onClick={() => eliminarClickHandler()}><button>Eliminar de la playlist</button></MenuItem>
                              :null}
                              <MenuDivider />

                              {userPlaylists ?
                                  userPlaylists.map((playlist) => (
                                      <MenuItem className={menuItemClassName} tabIndex={"0"} title={"Añadir a "+ playlist.name} onClick={() => listClickHandler(playlist.id)} key={playlist.id}><button>Añadir a {playlist.name}</button></MenuItem>
                                  ))
                              : <></>
                              }                        
                              
                          </Menu>
    );
  };

  const eliminarClickHandler = (playlistId) => {
    removeTrackFromPlayList(track, playlistId).then(
      setFeedback("Canción eliminada de la playlist.")
    );
  };

  const listClickHandler = (playList) => {
    console.log(track);
    console.log(playList);
    addTrackToPlayList(track, playList).then(
      setFeedback("Canción añadida a la playlist.")
    );
  };

  const newListClickHandler = (e) => {};

  const menuItemClassName = ({ hover }) =>{
    hover ? "menuItemHover" : "menuItem";

  return (
    <Menu
      menuButton={
        <MenuButton tabIndex={0} title="Opciones" className={"optionsButton"}>
          <FaEllipsisVertical className="options" />
        </MenuButton>
      }
      menuClassName="optionsMenu"
      viewScroll="close"
      position="auto"
      transition
    >
      <MenuItem
        tabIndex={"0"}
        className={menuItemClassName}
        title={"Añadir a canciones favoritas"}
        onClick={() => favoritesClickHandler()}
      >
        <button>Añadir a canciones favoritas</button>
      </MenuItem>
      {playlistId ? (
        <MenuItem
          tabIndex={"0"}
          className={menuItemClassName}
          title={"Eliminar de la playlist"}
          onClick={() => eliminarClickHandler(playlistId)}
        >
          <button>Eliminar de la playlist</button>
        </MenuItem>
      ) : null}
      <MenuDivider />

      {playLists ? (
        playLists.map((playList) => (
          <MenuItem
            className={menuItemClassName}
            tabIndex={"0"}
            title={"Añadir a " + playList.name}
            onClick={() => listClickHandler(playList)}
            key={playList.id}
          >
            <button>Añadir a {playList.name}</button>
          </MenuItem>
        ))
      ) : (
        <></>
      )}
    </Menu>
  );
}
