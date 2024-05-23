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

export default function PlayList({}) {
  const [playlist, setPlayList] = useState();
  const [playlistName, setPlaylistName] = useState();
  const [tracks, setTracks] = useState();
  const[owned, setOwned] = useState(false);

  useEffect(() => {
    async function loadPlayList() {
      const searchParams = new URLSearchParams(location.search);
      const playlistId = searchParams.get("playlistId");
      try {
        const playlist = await getPlayList(playlistId);
        setPlayList(playlist);
        const tracks = await getTracksFromPlaylist(playlist);
        setTracks(tracks);
        const isOwned = await isPlaylistOwned(playlist);
        setOwned(isOwned);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    }
    loadPlayList();
  }, []);

  return (
    <div className="playList d-flex flex-column flex-xl-row-reverse">
      {playlist ? (
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
      ) : (
        <></>
      )}
    </div>
  );
}
