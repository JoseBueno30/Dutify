import React, { useEffect } from "react";
import { useState } from "react";
import TrackList from "../trackList/trackList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css"
import { getPlayList, getTracksFromPlaylist } from "../../spotifyApi/SpotifyApiCalls";



export default function PlayList({}){
    const [playList, setPlayList] = useState();
    const [tracks, setTracks] = useState();
    


    useEffect(()=>{
        async function loadPlayList() {
            const searchParams = new URLSearchParams(location.search);
            const playlistId = searchParams.get('playlistId');
            try{
                const playList = await getPlayList(playlistId);
                setPlayList(playList);
                const tracks = await getTracksFromPlaylist(playList)
                setTracks(tracks);
            }catch(error){
                console.error("ERROR: ", error);
            }
        }
        loadPlayList();
    }, []);

    return(
        <div className="playList d-flex flex-column flex-xl-row-reverse">
            {playList?(
                <>
                    <PlayListInfo playList={playList}/>
                    <TrackList tracks={tracks} setTracks={setTracks} playlistId={playList.id}/>
                </>
            ):
            <></>}
        </div>
    );
}