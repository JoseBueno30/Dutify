import React, { useEffect } from "react";
import { useState } from "react";
import SongList from "../songList/songList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css";
import {
  getPlayList,
  getTracksFromPlaylist,
} from "../../spotifyApi/SpotifyApiCalls";
import Spinner from "../spinner/spinner";
import {
  getQueueIndex,
  playQueue,
  playTrack,
  queueEmitter,
  setQueue,
} from "../../spotifyApi/SongController";

export default function PlayList({}) {
  const [isPlaying, setPlaying] = useState(false);
  const [playList, setPlayList] = useState();
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);

  async function loadPlayList() {
    const searchParams = new URLSearchParams(location.search);
    const playlistId = searchParams.get("playlistId");
    const playList = await getPlayList(playlistId);
    setPlayList(playList);
  }

  const stopPlayerAnimation = () => {
    setPlaying(false);
  };
  const startPlayerAnimation = () => {
    const currentPlaylistPlaying =
      window.sessionStorage.getItem("playlistPlaying");
    console.log(playList);
    if (playList !== undefined && currentPlaylistPlaying === playList.id) {
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

  useEffect(() => {
    startPlayerAnimation();
  }, [playList]);

  useEffect(() => {
    async function loadTracks() {
      const tracksNew = await getTracksFromPlaylist(playList, tracks.length);
      let tracksAux = tracks.concat(tracksNew);
      setTracks(tracksAux);
    }
    if (playList !== undefined && tracks.length < playList.tracks.total)
      loadTracks().finally(() => setLoading(false));
  }, [playList, tracks]);

  const setQueuePlaylist = () => {
    let queue = [];
    const sessionQueue = JSON.parse(window.sessionStorage.getItem("queue"));
    const playlistPlaying = window.sessionStorage.getItem("playlistPlaying");
    queue = tracks.map((track) => track.track);
    if (
      sessionQueue === null ||
      playlistPlaying !== playList.id ||
      getQueueIndex() === queue.length
    ) {
      setQueue(queue);
      window.sessionStorage.setItem("playlistPlaying", playList.id);
      playQueue(queue);
    } else {
      playTrack();
    }
  };

  return (
    <div className="playList d-flex flex-column flex-xl-row-reverse">
      {playList && !loading ? (
        <>
          <PlayListInfo
            queueFunction={setQueuePlaylist}
            playList={playList}
            isPlaying={isPlaying}
            setPlaying={setPlaying}
          />
          <SongList
            tracks={tracks}
            playlistId={playList.id}
            setPlaying={setPlaying}
            loadQueue={setQueuePlaylist}
          />
        </>
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
}
