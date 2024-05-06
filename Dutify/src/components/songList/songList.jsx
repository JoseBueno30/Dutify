import React, { useEffect } from "react";
import { useState } from "react";
import SongButton from "../songButton/songButton";
import "./songListStyle.css";
import { MdOutlineBroadcastOnPersonal } from "react-icons/md";

export default function SongList({}) {
    const [topTracks, setTopTracks] = useState("");

    useEffect(()=>{
        async function obtenerDatos() {
            try{
                const tracks = await getTopTracks();
                setTopTracks(tracks);
                console.log(tracks);
            }catch(error){
                console.error("ERROR: ", error);
            }
        }
        obtenerDatos();
    }, []);

    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
    const token =
        "BQBT5NpMgVCsYgrWoAK_3Ue_MUWaqEbpPiL-JhH6uWBlClFeS1631xlZ1VWVpDF73rr_nzLL7_n3xOxULAJKQ3TRGEUwgRkcNSnBNEUs4-L8c3sgSRRHX9Wit_yXXT7JiZaZkALwrGtyIAlEpIvoxwhuFhICw39iwbPTU-MFgYUon_U2oBjf5-EZWO3R_oJitBuu1kscHePswx70KdhMCloQW_QTN3lD4DxJrymhgTUrlS3m0EKiV78CoHS1yA";
    async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
        });
        return await res.json();
    }

    async function getTopTracks() {
        // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
        return (
        await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=50", "GET")
        ).items;
    }

    async function clickTest() {
        const tracks = await getTopTracks();
        setTopTracks(tracks);
        console.log(tracks);
    }

  return (
    <div className="list container-fluid">
      {topTracks ? (
        topTracks.map((track) => (
          <SongButton
            key={track.id}
            name={track.name}
            artistName={track.artists[0].name}
            albumName={track.album.name}
            image={track.album.images[2].url}
            time_ms={track.duration_ms}
          />
        ))
      ) : (
        <SongButton />
      )}
    </div>
  );
}
