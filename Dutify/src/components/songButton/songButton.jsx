import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
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
import { GoAlertFill } from "react-icons/go";
import {
  addTrackToFavorites,
  addTrackToPlayList,
  removeTrackFromPlayList,
  sleep,
} from "../../spotifyApi/SpotifyApiCalls";
import { useSnackbar } from "@mui/base/useSnackbar";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { FaPlus } from "react-icons/fa";
import { TracksHandlersContext } from "../trackList/trackList";
import { FeedbackHandlerContext } from "../../App";
import {
  addTrackToQueue,
  getTrackObject,
  isTrackInPlayer,
  isTrackPlaying,
  pauseTrack,
  playTrack,
  queueEmitter,
  setQueueIndex,
  setSingleTrack,
} from "../../spotifyApi/SongController";

export default function SongButton({
  enPlaylist,
  track,
  index,
  loadQueue,
  setPlaying,
  enableAddButton = false,
  setRerender,
  isSmall,
  focus,
  handleSongFocus,
  setCurrentFocus
}) {
  const changeFeedback = useContext(FeedbackHandlerContext).changeFeedback;
  const playlistId = useContext(TracksHandlersContext).playlistId;
  
  const [optionsFocus, setOptionsFocus] = useState(false);
  const songButtonRef = useRef();
  const addButtonRef = useRef();
  const hasPreview = track.preview_url !== null;


  useEffect(() => {
    
    if (focus && songButtonRef?.current) {
      songButtonRef.current.focus();
    }
  }, [focus]);

  const focusSong = () => {
    setOptionsFocus(false);
    songButtonRef.current.focus();
    setCurrentFocus(index);
  }

  const songButtonKeydownHandler = (event) => {
    console.log(event.key)
    if (
      event.key === "Enter" &&
      document.activeElement === songButtonRef.current
    ) {
      songClickHandler(event);
    }else if(event.key === "ArrowRight"){
      if(enableAddButton && document.activeElement === songButtonRef.current){
        addButtonRef.current.focus();
      }else{
        setOptionsFocus(true);
      }
    }else if(event.key === "ArrowLeft"){
      if(enableAddButton && document.activeElement === addButtonRef.current){
        songButtonRef.current.focus();
      }
    }else if(!optionsFocus &&
      document.activeElement === songButtonRef.current){
      handleSongFocus(index, event.key);
    }
  };

  const listClickHandler = () => {
    addTrackToPlayList(track, playlistId).then((status) =>
      changeFeedback(status.message)
    );
    addTrackToQueue(track);
  };

  const timeMIN = Math.trunc(track.duration_ms / 60000);
  const seg = Math.trunc((track.duration_ms % 60000) / 1000);
  const timeMS = seg < 10 ? "0" + seg : seg;

  const songClickHandler = (e) => {
    if (!hasPreview) {
      changeFeedback("Esta canción no está disponible.")
      return
    };
    const id = e.currentTarget.id;
    const playlistPlaying = window.sessionStorage.getItem("playlistPlaying");

    if (isTrackInPlayer(track)) {
      if (isTrackPlaying()) {
        pauseTrack();
      } else {
        playTrack();
      }
    } else {
      if (enPlaylist && playlistId === playlistPlaying) {
        console.log("Reproduciendo misma playlist...");
        setQueueIndex(index);
      } else if (enPlaylist) {
        console.log("Reproduciendo playlist nueva...");
        loadQueue();
        setQueueIndex(index);
        setPlaying(true);
      } else {
        console.log(track.preview_url);
        setSingleTrack(track);
      }
    }
    queueEmitter.emit("trackStatusPlayerChanged");
    setRerender(Math.random);
    setCurrentFocus(index);
  };

  return (
      <div
        title={"Reproducir " + track.name}
        id={track.id}
        className={!hasPreview ? "songButton disabled-song-button" :"songButton"}
        onDoubleClick={songClickHandler}
        onKeyDown={songButtonKeydownHandler}
        role="option"
        aria-description={hasPreview ? "Reproducir canción: " + track.name : "La canción '" + track.name + "' no está disponible"}
        ref={songButtonRef}
        tabIndex={-1}
      >
        <div className="playContainer" onClick={songClickHandler} >
          <div
            className={ hasPreview ? (
              isTrackInPlayer(track)
                ? "songPlayButton playingSong"
                : "songPlayButton "
            ) : "songPlayButton disabled-song-button"}
            style={
              track.album.images[2] !== undefined
                ? { backgroundImage: "url(" + track.album.images[2].url + ")" }
                : {}
            }
          >
            {hasPreview ? (
              isTrackInPlayer(track) && isTrackPlaying() ? (
                <FaPause className="playButton" />
              ) : (
                <FaPlay className="playButton" />
              )
            ) : (
              <GoAlertFill className="noPrev" />
            )}

          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className={"nameAuthorContainer col d-flex " + (isSmall?"flex-column":"flex-row justify-content-between align-items-center")}>
              <div
                title={track.name}
                className={isSmall?"nameSmallContainer":"name"}
                aria-description="nombre"
              >
                {isSmall? track.name.slice(0,20) : track.name.slice(0,40)}
              </div>
              <div
                title={track.artists[0].name}
                className={isSmall?"authorSmallContainer":"author"}
                aria-description="artista"
              >
                {isSmall? track.artists[0].name.slice(0,25) : track.artists[0].name}
              </div>
            </div>
            <div
              title={track.album.name}
              className={isSmall? "album col-2 d-none":"album col-2"}
              aria-description="álbum"
            >
              {track.album.name}
            </div>
            <div
              title={"Duración: " + timeMIN + " minutos y " + seg + " segundos"}
              className={"time col-3 col-md-2 d-flex justify-content-center " + (isSmall?"d-none":"")}
              aria-description="duración"
            >
              <div aria-hidden="true">
                {timeMIN}:{timeMS}
              </div>
            </div>

            {enableAddButton && playlistId ? (
              <button
                title="Añadir canción a lista"
                className={"col-1 d-flex justify-content-center " + (isSmall?"btnAddSmall":"btnAddBig")}
                ref={addButtonRef}
                tabIndex={-1}
                onClick={listClickHandler}
              >
                {isSmall ? <FaPlus /> : "Añadir"}
              </button>
            ) : (
              <></>
            )}

            <div className="col-md-1 col-2 d-flex justify-content-center">
              <Options track={track} index={index} optionsFocus={optionsFocus} focusSong={focusSong}/>
            </div>
          </div>
        </div>
      </div>
  );
}

function Options({ track, index, optionsFocus, focusSong }) {
  const removeTrackFromPlaylist = useContext(TracksHandlersContext).handleRemoveTrackFromPlaylist;
  const addTrackToPlaylist = useContext(TracksHandlersContext).handleAddTrackToPlaylist;
  const addTrackToFavorites = useContext(TracksHandlersContext).handleAddTrackToFavorites;
  const userPlaylists = useContext(TracksHandlersContext).userPlaylists;
  const playlistId = useContext(TracksHandlersContext).playlistId;
  const owned = useContext(TracksHandlersContext).owned;
  const changeFeedback = useContext(FeedbackHandlerContext).changeFeedback;

  const focusRef = useRef();

  

  useEffect(() => {
    if (optionsFocus && focusRef?.current) {
      focusRef?.current.focus();
    }
  }, [optionsFocus]);

  const listClickHandler = (playlistId) => {
    addTrackToPlaylist(track, playlistId);
  };

  const eliminarClickHandler = () => {
    removeTrackFromPlaylist(track, index);
  };

  const favoritesClickHandler = () => {
    addTrackToFavorites(track);
  };

  const menuItemClassName = ({ hover }) =>
    hover ? "menuItemHover" : "menuItem";


  const onKeyDown = (e) => {
    e.preventDefault();
    switch (e.key) {
      case "ArrowLeft":
        focusSong();
        break;

      default:
        return;
    }

  };

  return (
      <Menu
      menuButton={
        <MenuButton tabIndex={-1}
        ref={focusRef} title="Opciones" className={"optionsButton"} onKeyDown={onKeyDown}>
          <FaEllipsisVertical className="options" />
        </MenuButton>
      }
      menuClassName="optionsMenu"
      viewScroll="close"
      position="auto"
      transition
    >
      <MenuItem
        
        className={menuItemClassName}
        title={"Añadir a canciones favoritas"}
        onClick={() => favoritesClickHandler()}
      >
        Añadir a canciones favoritas
      </MenuItem>
      {playlistId && owned ? (
        <MenuItem
          
          className={menuItemClassName}
          title={"Eliminar de la playlist"}
          onClick={() => eliminarClickHandler()}
        >
          Eliminar de la playlist
        </MenuItem>
      ) : null}
      <MenuDivider />

      {userPlaylists ? (
        userPlaylists.map((playlist) => (
          <MenuItem
            className={menuItemClassName}
            
            title={"Añadir a " + playlist.name}
            onClick={() => listClickHandler(playlist.id)}
            key={playlist.id}
          >
            Añadir a {playlist.name}
          </MenuItem>
        ))
      ) : (
        <></>
      )}
    </Menu>
  );
}
