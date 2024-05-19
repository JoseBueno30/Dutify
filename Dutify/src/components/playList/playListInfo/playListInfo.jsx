import React from "react";
import "./playListInfoStyle.css"
import { FaGear } from "react-icons/fa6";
import PlayListPlayer from "./playListPlayer/playListPlayer";
import { Menu, MenuItem, MenuButton, SubMenu, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { FcButtingIn } from "react-icons/fc";
import { unfollowPlaylist } from "../../../spotifyApi/SpotifyApiCalls";


export default function PlayListInfo({playlist}){

    const timeMIN = Math.trunc(playlist.duration_ms/60000);
    const timeMS = Math.trunc((playlist.duration_ms/1000)%60);

    return(
        <div className="playListInfoContainer d-flex flex-column container-fluid">
            <div className='d-flex justify-content-xl-evenly  justify-content-center align-items-center '>
                <p title={playlist.name} className="playListName ">{playlist.name}</p>
                
            </div>
            {playlist.images?
            <img className="playListImage" src={playlist.images[0].url}></img>
            :<div className="playListImage"></div>}
            <div className="playListInfo d-flex align-items-stretch justify-content-evenly">
                <p>{playlist.tracks.total + " canciones"}</p>
                <Options playlistId={playlist.id}/>
            </div>
            <PlayListPlayer className="playListPlayer" />
        </div>
    );
}

function Options({playlistId}){

    const cambiarNombreClickHandler = (e) => {
        
    }

    const eliminarClickHandler = (e) => {
        console.log("AAA")
        unfollowPlaylist(playlistId).then(window.location.href = "/Listas");
    }

    const menuItemClassName = ({ hover }) =>
        hover ? 'menuItemHover' : 'menuItem';

    return(
        <Menu 
            menuButton={<MenuButton tabIndex={0} className={"playListOptionsButton"}><FaGear className="playListOptions"/></MenuButton>} 
            menuClassName="optionsMenu"
            viewScroll="close"
            gap={6}
            align="start"
            transition>
                                <MenuItem className={menuItemClassName} onClick={cambiarNombreClickHandler}><button>Cambiar nombre</button></MenuItem>
                                <MenuItem className={menuItemClassName} onClick={eliminarClickHandler}><button>Eliminar playlist</button></MenuItem>
                                
                            </Menu>
    );
}