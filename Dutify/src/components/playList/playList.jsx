import React, { useEffect } from "react";
import { useState } from "react";
import TrackList from "../trackList/trackList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css"
import { getPlayList, getTracksFromPlaylist } from "../../spotifyApi/SpotifyApiCalls";
import ListModal from "../listModal/listModal";



export default function PlayList({}){
    const [playlist, setPlayList] = useState();
    const [playlistName, setPlaylistName] = useState()
    const [tracks, setTracks] = useState();
    


    useEffect(()=>{
        async function loadPlayList() {
            const searchParams = new URLSearchParams(location.search);
            const playlistId = searchParams.get('playlistId');
            try{
                const playlist = await getPlayList(playlistId);
                setPlayList(playlist);
                const tracks = await getTracksFromPlaylist(playlist)
                setTracks(tracks);
            }catch(error){
                console.error("ERROR: ", error);
            }
        }
        loadPlayList();
    }, []);

    return(
        <div className="playList d-flex flex-column flex-xl-row-reverse">
            {playlist?(
                <>
                    <ListModal playlist={playlist}/>
                    <PlayListInfo playlist={playlist}/>
                    <TrackList tracks={tracks} setTracks={setTracks} playlistId={playlist.id}/>
                </>
            ):
            <></>}
        </div>
    );
}