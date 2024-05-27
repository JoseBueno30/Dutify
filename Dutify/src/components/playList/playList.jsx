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
  const [playlist, setPlayList] = useState();
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
    const isFollowed = await isUserFollowingPlaylist(playList.id);
    setFollowed(isFollowed);
    const isOwned = await isPlaylistOwned(playList);
    setOwned(isOwned);
    setPlayList(playList);
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
    loadPlayList();

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
    async function loadTracks() {
      const tracksNew = await getTracksFromPlaylist(playlist, tracks.length);
      let tracksAux = tracks.concat(tracksNew);
      setTracks(tracksAux);
    }
    if (playlist !== undefined && !fullyLoaded){
      // if(tracks.length === 0){setLoading(true)}
      loadTracks().finally(() => setLoading(false));
      if(tracks.length === playlist.tracks.total){setFullyLoaded(true)}
    }
  }, [playlist, tracks]); // Que este useEffect dependa de las tracks hace que al eliminar recarge toda la playlist entera y se buguee

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
