import React, { useEffect, useRef } from "react";
import { useState, createContext, useContext } from "react";
import SongButton from "../songButton/songButton";
import "./trackListStyle.css";

import AddSongButton from "./addSongButton/addSongButton";
import SongInfo from "./songInfo/songInfo";
import { getUserOwnedPlaylists, sleep } from "../../spotifyApi/SpotifyApiCalls";

import {
  addTrackToFavorites,
  addTrackToPlayList,
  removeTrackFromPlayList,
} from "../../spotifyApi/SpotifyApiCalls";
import { FeedbackHandlerContext } from "../../App";
import NavButton from "../topBar/navButton/navButton";
import { addTrackToQueue, removeTrackFromQueue } from "../../spotifyApi/SongController";

export const TracksHandlersContext = createContext(null);

export default function TrackList({
  tracks,
  setTracks,
  playlistId,
  loadQueue,
  setPlaying,
  owned,
  busqueda = false,
}) {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [rerender, setRerender] = useState(false);
  const changeFeedback = useContext(FeedbackHandlerContext).changeFeedback;
  const [currentFocus, setCurrentFocus] = useState();

  useEffect(() => {
    async function getUserPlayLists() {
      try {
        const playlists = await getUserOwnedPlaylists().then();
        setUserPlaylists(playlists);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    }
    getUserPlayLists();
  }, []);
  
  const refContainer = useRef();
  const [isSmall, setIsSmallContainer] = useState(false);

  useEffect(() => {
      function handleResize() {
        if(refContainer.current){
          setIsSmallContainer(refContainer.current.offsetWidth < 500);
        }          
      }
      setIsSmallContainer(refContainer.current.offsetWidth < 500);
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
  }, []);

  useEffect(() =>{
  }, [rerender])

  const handleSongFocus = (index, eventKey) => {
    if(eventKey === "ArrowDown"){
      setCurrentFocus(currentFocus === tracks.length- 1? 0 : currentFocus + 1)
    }else if(eventKey === "ArrowUp"){
      setCurrentFocus(currentFocus === 0 ? tracks.length - 1 : currentFocus - 1)
    }
  }


  const reloadPlaylist = async (addedPlaylistId, code) => {
    const searchParams = new URLSearchParams(location.search);
    const currentPlaylistId = searchParams.get("playlistId");
    if (
      addedPlaylistId === currentPlaylistId &&
      code === 2
    ) {
      await sleep(2500);
      window.location.href = "playlist?playlistId=" + addedPlaylistId;
    }
  };

  async function handleAddTrackToPlaylist(track, addedPlaylistId) {
    addTrackToPlayList(track, addedPlaylistId).then(
      (status) => (changeFeedback(status.message),
      addTrackToQueue(track),
      reloadPlaylist(addedPlaylistId, status.code))
    );
  }

  async function handleRemoveTrackFromPlaylist(track, trackIndex){
    removeTrackFromPlayList(track, playlistId).then(status => changeFeedback(status));
    let newTracks = [...tracks];
    newTracks.splice(trackIndex, 1);
    setTracks(newTracks)
    removeTrackFromQueue(track);
  }
  
  function handleAddTrackToFavorites(track){
    addTrackToFavorites(track).then(status => changeFeedback(status));
  }

  function keyDownHandler(event){
    if((event.key === "Enter" || event.key === "ArrowDown") && refContainer.current === document.activeElement){ 
      if(currentFocus!== undefined){
        if(currentFocus === tracks.length - 1){
          setCurrentFocus(0);
        }else{
          setCurrentFocus(currentFocus + 1);
        }
      };
      if(currentFocus===undefined)setCurrentFocus(0);
    }else if(event.key === "ArrowUp" && refContainer.current === document.activeElement){ 
      if(currentFocus!== undefined){
        if(currentFocus === 0){
          setCurrentFocus(tracks.length - 1);
        }else{
          setCurrentFocus(currentFocus - 1);
        }
      };
      if(currentFocus===undefined)setCurrentFocus(tracks.length - 1);
    }
  }    

  return (
    <TracksHandlersContext.Provider value={{handleAddTrackToPlaylist, handleRemoveTrackFromPlaylist, handleAddTrackToFavorites, owned, playlistId, userPlaylists}}>
      <div tabIndex={0} className="list container-fluid" onKeyDown={keyDownHandler} ref={refContainer} role="listbox">
        {tracks.length > 0 &&!isSmall? <SongInfo showAddButton={busqueda && playlistId} isSmall={isSmall}/> : (<></>)}
        
        {tracks.length > 0 ? (
          tracks.map((track, index) => (
            track !== null ? <SongButton
            enPlaylist={!busqueda}
            track={track}
            key={index}
            index={index}
            loadQueue={loadQueue}
            setPlaying={setPlaying}
            enableAddButton={busqueda}
            rerender={rerender}
            setRerender={setRerender}
            isSmall={isSmall}
            focus={currentFocus === index}
            handleSongFocus={handleSongFocus}
            setCurrentFocus={setCurrentFocus}
          /> : <></>
          ))
        ) : ( <></> )}

        {playlistId && tracks.length == 0 ? (
          <div className="emptyList d-flex justify-content-center" tabIndex={0}>
            Esta lista de reproducción esta vacía.
          </div>
        ) : (
          <></>
        )}

        {!playlistId && tracks.length == 0 ? (
          <div className="emptyList d-flex flex-column pb-3" tabIndex={0}>
            <h2 className="notFoundMessage">¡Oops, no hemos encontrado nada!</h2>
            <h3>
              Explora nuevas canciones en la sección de{" "}
              <a className="inicio-link" href="/Dutify/inicio" aria-label="Ir a inicio">  
                 Inicio
              </a>
            </h3>
          </div>
        ) : (
          <></>
        )}

        {!busqueda && owned ? (
          <div className="d-flex justify-content-center">
            <AddSongButton playlistId={playlistId} />
          </div>
        ) : null}
      </div>
    </TracksHandlersContext.Provider>
  );
}
