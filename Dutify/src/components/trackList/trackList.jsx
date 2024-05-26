import React, { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import SongButton from "../songButton/songButton";
import "./trackListStyle.css";

import AddSongButton from "./addSongButton/addSongButton";
import SongInfo from "./songInfo/songInfo";
import { getUserOwnedPlaylists } from "../../spotifyApi/SpotifyApiCalls";

import { addTrackToFavorites, addTrackToPlayList, removeTrackFromPlayList } from "../../spotifyApi/SpotifyApiCalls";
import { FeedbackHandlerContext } from "../../App";




export const TracksHandlersContext = createContext(null);

export default function TrackList({tracks, setTracks, playlistId, owned}) {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const changeFeedback = useContext(FeedbackHandlerContext).changeFeedback;

  useEffect(()=>{
      async function getUserPlayLists() {
          try{
            console.log(tracks)
              const playlists = await getUserOwnedPlaylists().then()
              setUserPlaylists(playlists);
          }catch(error){
              console.error("ERROR: ", error);
          }
      }
      getUserPlayLists();
  }, []);

  async function handleAddTrackToPlayList(track, playlist) {
    addTrackToPlayList(track, playlist).then(status => changeFeedback(status));
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
    removeTrackFromPlayList(track, playlistId).then(status => changeFeedback(status));
    let newTracks = [...tracks];
    newTracks.splice(trackIndex, 1);
    setTracks(newTracks)
  }
  
  function handleAddTrackToFavorites(track){
    addTrackToFavorites(track).then(status => changeFeedback(status));
  }

    

  return (
    <TracksHandlersContext.Provider value={{handleAddTrackToPlayList, handleRemoveTrackFromPlaylist, handleAddTrackToFavorites, owned, playlistId, userPlaylists}}>
      <div className="list container-fluid ">
         

        {tracks.length>0 ? (<SongInfo/>) : (<></>)}
        
        {tracks.length>0 ? (
            tracks.map((track, index) => (
              track !== null ? <SongButton
              key={index}
              track={track}
              index={index}
              owned = {owned}
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
