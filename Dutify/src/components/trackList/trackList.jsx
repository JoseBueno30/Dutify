import React, { useEffect } from "react";
import { useState, createContext, useReducer } from "react";
import SongButton from "../songButton/songButton";
import "./trackListStyle.css";

import AddSongButton from "./addSongButton/addSongButton";
import SongInfo from "./songInfo/songInfo";
import { getUserOwnedPlaylists } from "../../spotifyApi/SpotifyApiCalls";
import { useSnackbar } from '@mui/base/useSnackbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { addTrackToFavorites, addTrackToPlayList, removeTrackFromPlayList } from "../../spotifyApi/SpotifyApiCalls";



export const TracksHandlersContext = createContext(null);

export default function TrackList({tracks, setTracks, playlistId}) {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [feedback, setFeedback] = useState("");

  const handleClose = () => {
    setFeedback("");
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    feedback,
    autoHideDuration: 5000,
  });

  useEffect(()=>{
      async function getUserPlayLists() {
          try{
              const playlists = await getUserOwnedPlaylists().then()
              setUserPlaylists(playlists);
          }catch(error){
              console.error("ERROR: ", error);
          }
      }
      getUserPlayLists();
  }, []);

  async function handleAddTrackToPlayList(track, playlist) {
    addTrackToPlayList(track, playlist).then(status => setFeedback(status));
    //Si se añade desde la pestaña de busqueda no se recarga porq se esta añadiendo desde la songlist de ese componente
    //por lo q no tiene la id de la playlist aunque esta si la tenga 
    console.log(playlistId)
    console.log(playlist.id)
    if(playlist.id === playlistId){
      // console.log("AAA")
      // let newTracks = [];
      // tracks == [] ? newTracks=track : newTracks = [...tracks, track];
      // setTracks(newTracks);
    }
  }

  function handleRemoveTrackFromPlaylist(track, trackIndex){
    removeTrackFromPlayList(track, playlistId).then(status => setFeedback(status));
    let newTracks = [...tracks];
    newTracks.splice(trackIndex, 1);
    setTracks(newTracks)
  }
  
  function handleAddTrackToFavorites(track){
    addTrackToFavorites(track).then(status => setFeedback(status));
  }

    

  return (
    <TracksHandlersContext.Provider value={{handleAddTrackToPlayList, handleRemoveTrackFromPlaylist, handleAddTrackToFavorites, playlistId, userPlaylists}}>
      <div className="list container-fluid ">
        {feedback !== "" ? (
          <ClickAwayListener onClickAway={onClickAway}>
            <div className="CustomSnackbar" {...getRootProps()}>{feedback}</div>
          </ClickAwayListener>) 
        : null}  

        {tracks.length>0 ? (<SongInfo/>) : (<></>)}
        
        {tracks.length>0 ? (
            tracks.map((track, index) => (
              track !== null ? <SongButton
              key={index}
              track={track}
              index={index}
            /> : <></>
            ))
        ) : (
          <div className="emptyList d-flex justify-content-center">
            {playlistId ? "No hay canciones en esta PlayList" : "Busca la canción en la barra de busqueda para añadir"} 
          </div>
        )}

        {playlistId?
        <div className="d-flex justify-content-center"><AddSongButton/></div>
        :null}
      </div>
    </TracksHandlersContext.Provider>
  );
}