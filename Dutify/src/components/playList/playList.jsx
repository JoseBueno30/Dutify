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
  getAllTracksFromPlaylist,
} from "../../spotifyApi/SpotifyApiCalls";
import ListModal from "../listModal/listModal";
import DeleteListModal from "../listModal/deleteListModal/deleteListModal";
import Spinner from "../spinner/spinner";
import { FeedbackHandlerContext } from "../../App";

export default function PlayList({}) {
  const [playlist, setPlayList] = useState();
  const [playlistName, setPlaylistName] = useState();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [owned, setOwned] = useState(false);
  
  const changeFeedback = useContext(FeedbackHandlerContext).changeFeedback;
  
  async function loadPlayList() {
    const searchParams = new URLSearchParams(location.search);
    const playlistId = searchParams.get("playlistId");
    const playList = await getPlayList(playlistId);
    const isFollowed = await isUserFollowingPlaylist(playlistId);
    setFollowed(isFollowed);
    const isOwned = await isPlaylistOwned(playList);
    setOwned(isOwned);
    setPlayList(playList);
    const tracksNew = await getAllTracksFromPlaylist(playList);
    setTracks(tracksNew);
  }

  useEffect(() => {
    setLoading(true);
    loadPlayList().finally(() => setLoading(false));
  }, []);

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
