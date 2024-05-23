import React, { useEffect } from "react";
import { useState } from "react";
import SongList from "../songList/songList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css"
import { getPlayList, getTracksFromPlaylist } from "../../spotifyApi/SpotifyApiCalls";
import Spinner from "../spinner/spinner";

export default function PlayList({}) {
  const [playList, setPlayList] = useState();
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);

  async function loadPlayList() {
    const searchParams = new URLSearchParams(location.search);
    const playlistId = searchParams.get("playlistId");
    const playList = await getPlayList(playlistId);
    setPlayList(playList);
  }

  useEffect(() => {
    loadPlayList();
  }, []);

  useEffect(() => {
    async function loadTracks() {
      const tracksNew = await getTracksFromPlaylist(playList, tracks.length);
      let tracksAux = tracks.concat(tracksNew);
      setTracks(tracksAux);
    }
    if (playList !== undefined && tracks.length < playList.tracks.total) loadTracks().finally(() => setLoading(false));
  }, [playList, tracks]);

  return (
    <div className="playList d-flex flex-column flex-xl-row-reverse">
      {playList && !loading?(
                <>
                    <PlayListInfo playList={playList}/>
                    <SongList tracks={tracks} playlistId={playList.id}/>
                </>
            ):
            <Spinner></Spinner>}
    </div>
  );
}
