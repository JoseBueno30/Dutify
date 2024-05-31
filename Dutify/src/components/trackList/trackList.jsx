import React, { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import SongButton from "../songButton/songButton";
import "./trackListStyle.css";

import AddSongButton from "./addSongButton/addSongButton";
import SongInfo from "./songInfo/songInfo";
import { getUserOwnedPlaylists, sleep } from "../../spotifyApi/SpotifyApiCalls";

import { addTrackToFavorites, addTrackToPlayList, removeTrackFromPlayList } from "../../spotifyApi/SpotifyApiCalls";
import { FeedbackHandlerContext } from "../../App";
import NavButton from "../topBar/navButton/navButton";
import { removeTrackFromQueue } from "../../spotifyApi/SongController";




export const TracksHandlersContext = createContext(null);

export default function TrackList({tracks, setTracks, playlistId, loadQueue, setPlaying, owned, busqueda=false}) {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [rerender, setRerender] = useState(false);
  const changeFeedback = useContext(FeedbackHandlerContext).changeFeedback;

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

  useEffect(() =>{
  }, [rerender])

  async function handleAddTrackToPlayList(track, addedPlaylistId) {
    
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

    

  return (
    <TracksHandlersContext.Provider value={{handleAddTrackToPlayList, handleRemoveTrackFromPlaylist, handleAddTrackToFavorites, owned, playlistId, userPlaylists}}>
      <div className="list container-fluid ">
        {tracks.length > 0 ? <SongInfo showAddButton={busqueda && playlistId}/> : (<></>)}
        
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
          /> : <></>
          ))
        ) : ( <></> )}

          {playlistId && tracks.length == 0 ? <div className="emptyList d-flex justify-content-center">Esta lista esta vacía</div> : <></>}

          {!playlistId && tracks.length == 0 ? (
            <div className="emptyList d-flex justify-content-center"><p>No hay resultados para esta búsqueda<h4 className="mt-2">Explora nuevas canciones en <a className="inicio-link" href="/inicio">Inicio</a></h4></p></div>
          ): <></>}

          {!busqueda && owned? <div className="d-flex justify-content-center"><AddSongButton playlistId = {playlistId}/></div>:null}

      </div>
    </TracksHandlersContext.Provider>
  );
}
