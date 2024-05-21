import React, { useEffect } from "react";
import { useState } from "react";
import SongList from "../songList/songList";
import PlayListInfo from "./playListInfo/playListInfo";
import "./playListStyle.css"
import { getPlayList, getTracksFromPlaylist } from "../../spotifyApi/SpotifyApiCalls";
import Spinner from "../spinner/spinner";



export default function PlayList({}){
    const [playList, setPlayList] = useState();
    const [tracks, setTracks] = useState();
    const [loading, setLoading] = useState(false);
    


    useEffect(()=>{
        async function loadPlayList() {
            setLoading(true);
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
        loadPlayList().finally(() => setLoading(false));
    }, []);

    return(
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