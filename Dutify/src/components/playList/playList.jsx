import React, { useContext, useEffect } from "react";
import { useState } from "react";
import TrackList from "../trackList/trackList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css";
import {
  getPlayList,
  getTracksFromPlaylist,
  followPlaylist,
  unfollowPlaylist,
  isPlaylistOwned,
  isUserFollowingPlaylist,
  getAllTracksFromPlaylist,
} from "../../spotifyApi/SpotifyApiCalls";
import {
  getQueueIndex,
  playQueue,
  playTrack,
  queueEmitter,
  setQueue,
} from "../../spotifyApi/SongController";
import ListModal from "../listModal/listModal";
import DeleteListModal from "../listModal/deleteListModal/deleteListModal";
import Spinner from "../spinner/spinner";
import { FeedbackHandlerContext } from "../../App";
import { SiTruenas } from "react-icons/si";

export default function PlayList({}) {
  const [isPlaying, setPlaying] = useState(false);
  const [playlist, setPlayList] = useState(null);
  const [playlistName, setPlaylistName] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const [owned, setOwned] = useState(false);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const changeFeedback = useContext(FeedbackHandlerContext).changeFeedback;

  async function loadPlayList() {
    const searchParams = new URLSearchParams(location.search);
    const playlistId = searchParams.get("playlistId");
    const playList = await getPlayList(playlistId);
    setPlayList(playList);
    setPlaylistName(playList.name);
    const isFollowed = await isUserFollowingPlaylist(playlistId);
    setFollowed(isFollowed);
    const isOwned = await isPlaylistOwned(playList);
    setOwned(isOwned);
    setPlayList(playList);
    const tracksNew = await getTracksFromPlaylist(playList, tracks.length);
    await setTracks(tracksNew);
  }

  async function loadTracks() {
    const tracksNew = await getTracksFromPlaylist(playlist, tracks.length);
    let tracksAux = tracks.concat(tracksNew);
    await setTracks(tracksAux);
    if (tracksAux.length === playlist.tracks.total) {
      setFullyLoaded(true);
    }
  }

  const stopPlayerAnimation = () => {
    //console.log("termina la animacion playlist");
    setPlaying(false);
  };
  const startPlayerAnimation = () => {
    //console.log("empieza la animacion playlist")
    const currentPlaylistPlaying =
      window.sessionStorage.getItem("playlistPlaying");
    const searchParams = new URLSearchParams(location.search);
    const playlistId = searchParams.get("playlistId");
    //console.log(isPlaying)
    if (!isPlaying && currentPlaylistPlaying === playlistId) {
      setPlaying(true);
    }
  };

  useEffect(() => {
    if(playlistName === ""){
      document.title = "Cargando PlayList | Dutify";
    }
    else{
      document.title = playlistName + " | Dutify";
    }
  },[playlistName]);

  useEffect(() => {
    
    setLoading(true);
    loadPlayList().finally(() => setLoading(false));

    queueEmitter.on("queueEnded", stopPlayerAnimation);
    queueEmitter.on("trackStatusTrue", startPlayerAnimation);
    queueEmitter.on("trackStatusFalse", stopPlayerAnimation);
    
    return () => {
      queueEmitter.off("trackStatusTrue", startPlayerAnimation);
      queueEmitter.off("trackStatusFalse", stopPlayerAnimation);
      queueEmitter.off("queueEnded", stopPlayerAnimation);
    };
  }, []);

  // useEffect(() => {
  //   console.log("entra aqui?")
  //   startPlayerAnimation();
  // }, [playList]);

  useEffect(() => {
    if (playlist !== undefined && !fullyLoaded && tracks.length > 0) {
      loadTracks();
    }
  }, [tracks, playlist]);



  const followPlaylistHandler = () => {
    setFollowed(true);
    followPlaylist(playlist).then((status) => changeFeedback(status));
  };

  const unfollowPlaylistHandler = () => {
    setFollowed(false);
    unfollowPlaylist(playlist).then((status) => changeFeedback(status));
  };

  const setQueuePlaylist = () => {
    let queue = [];
    const sessionQueue = JSON.parse(window.sessionStorage.getItem("queue"));
    const playlistPlaying = window.sessionStorage.getItem("playlistPlaying");
    queue = tracks.map((track) => track);
    if (
      sessionQueue === null ||
      playlistPlaying !== playlist.id ||
      getQueueIndex() === queue.length
    ) {
      setQueue(queue);
      window.sessionStorage.setItem("playlistPlaying", playlist.id);
      playQueue(queue);
    } else {
      playTrack();
    }
  };

  return (
    <div className="playList d-flex flex-column flex-xl-row-reverse">
      {playlist && !loading ? (
        <>
          <ListModal playlist={playlist} />

          <DeleteListModal playlist={playlist} />
          <PlayListInfo
            queueFunction={setQueuePlaylist}
            playList={playlist}
            isPlaying={isPlaying}
            setPlaying={setPlaying}
            owned={owned}
            followed={followed}
            followPlaylistHandler={followPlaylistHandler}
            unfollowPlaylistHandler={unfollowPlaylistHandler}
          />
          <TrackList
            tracks={tracks}
            playlistId={playlist.id}
            setPlaying={setPlaying}
            loadQueue={setQueuePlaylist}
            owned={owned}
            setTracks={setTracks}
          />
        </>
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
}
