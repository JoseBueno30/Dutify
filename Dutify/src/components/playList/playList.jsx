import React, { useContext, useEffect } from "react";
import { useState } from "react";
import TrackList from "../trackList/trackList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css";
import {
  followPlaylist,
  unfollowPlaylist,
  getPlayList,
  getTracksFromPlaylist,
  isPlaylistOwned,
  isUserFollowingPlaylist,
} from "../../spotifyApi/SpotifyApiCalls";
import ListModal from "../listModal/listModal";
import DeleteListModal from "../listModal/deleteListModal/deleteListModal";
import Spinner from "../spinner/spinner";
import { FeedbackHandlerContext } from "../../App";

export default function PlayList({}) {
  const [playlist, setPlayList] = useState();
  const [playlistName, setPlaylistName] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [owned, setOwned] = useState(false);
  
  const changeFeedback = useContext(FeedbackHandlerContext).changeFeedback;
  
  async function loadPlayList() {
    const searchParams = new URLSearchParams(location.search);
    const playlistId = searchParams.get("playlistId");
    const playList = await getPlayList(playlistId);
    setPlayList(playList);
    setPlaylistName(playList.name);
    const isFollowed = await isUserFollowingPlaylist(playList.id);
    setFollowed(isFollowed);
    const isOwned = await isPlaylistOwned(playList);
    setOwned(isOwned);
    setPlayList(playList);
  }

  useEffect(() => {
    if(playlistName === ""){
      document.title = "Cargando PlayList | Dutify";
    }
    else{
      document.title = playlistName + " | Dutify";
    }
  },[playlistName]);

  useEffect(() => {
    loadPlayList();

  }, []);

  useEffect(() => {
    async function loadTracks() {
      const tracksNew = await getTracksFromPlaylist(playlist, tracks.length);
      let tracksAux = tracks.concat(tracksNew);
      setTracks(tracksAux);
    }
    if (playlist !== undefined && tracks.length < playlist.tracks.total)
      loadTracks().finally(() => setLoading(false));
  }, [playlist, tracks]); // Que este useEffect dependa de las tracks hace que al eliminar recarge toda la playlist entera y se buguee


  
  const followPlaylistHandler = () => {
    setFollowed(true);
    followPlaylist(playlist).then((status) => changeFeedback(status));
  };

  const unfollowPlaylistHandler = () => {
    setFollowed(false);
    unfollowPlaylist(playlist).then((status) => changeFeedback(status));
  };

  return (
    <div className="playList d-flex flex-column flex-xl-row-reverse">
      {playlist && !loading ? (
        <>
          <ListModal playlist={playlist} />

          <DeleteListModal playlist={playlist} />
          <PlayListInfo
            playlist={playlist}
            owned={owned}
            followed={followed}
            followPlaylistHandler={followPlaylistHandler}
            unfollowPlaylistHandler={unfollowPlaylistHandler}
          />
          <TrackList
            tracks={tracks}
            owned={owned}
            setTracks={setTracks}
            playlistId={playlist.id}
          />
        </>
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
}
