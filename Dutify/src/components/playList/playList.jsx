import React, { useEffect } from "react";
import { useState } from "react";
import TrackList from "../trackList/trackList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css";
import {
  getPlayList,
  getTracksFromPlaylist,
  isPlaylistOwned,
} from "../../spotifyApi/SpotifyApiCalls";
import ListModal from "../listModal/listModal";
import DeleteListModal from "../listModal/deleteListModal/deleteListModal";
import Spinner from "../spinner/spinner";

export default function PlayList({}) {
  const [playlist, setPlayList] = useState();
  const [playlistName, setPlaylistName] = useState();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const[owned, setOwned] = useState(false);

  async function loadPlayList() {
    const searchParams = new URLSearchParams(location.search);
    const playlistId = searchParams.get("playlistId");
    const playList = await getPlayList(playlistId);
    setPlayList(playList);
    const isOwned = await isPlaylistOwned(playList);
    setOwned(isOwned);
  }

  useEffect(() => {
    loadPlayList();
  }, []);

  useEffect(() => {
    async function loadTracks() {
      console.log("LOADING")
      const tracksNew = await getTracksFromPlaylist(playlist, tracks.length);
      let tracksAux = tracks.concat(tracksNew);
      setTracks(tracksAux);
    }
    if (playlist !== undefined && tracks.length < playlist.tracks.total) loadTracks().finally(() => setLoading(false));
  }, [playlist, tracks]);

  return (
    <div className="playList d-flex flex-column flex-xl-row-reverse">
    {playlist && !loading?(
              <>
              <ListModal playlist={playlist} />
    
              <DeleteListModal playlist={playlist} />
              <PlayListInfo playlist={playlist} owned={owned} />
              <TrackList
                tracks={tracks}
                owned={owned}
                setTracks={setTracks}
                playlistId={playlist.id}
              />
            </>
          ):
          <Spinner></Spinner>}
  </div>
  );
}
