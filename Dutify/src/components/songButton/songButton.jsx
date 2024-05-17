import React from "react";
import { useState } from "react";
import { FaEllipsisVertical, FaPlay, FaPause } from "react-icons/fa6";
import { Menu, MenuItem, MenuButton, SubMenu, MenuDivider, FocusableItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { useThemeContext } from "../../context/ThemeContext";
import "./songButtonStyle.css";
import { addTrackToFavorites, addTrackToPlayList, removeTrackFromPlayList } from "../../spotifyApi/SpotifyApiCalls";
import { useSnackbar } from '@mui/base/useSnackbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';


export default function SongButton({track, playLists, playlistId}){
    const [feedback, setFeedback] = useState("")
    const [isPlaying, setPlaying] = useState(false);

    const handleClose = () => {
        setFeedback("");
    };

    const { getRootProps, onClickAway } = useSnackbar({
        onClose: handleClose,
        feedback,
        autoHideDuration: 5000,
    });

    const timeMIN = Math.trunc(track.duration_ms/60000);
    const timeMS = Math.trunc((track.duration_ms/1000)%60);

    const songClickHandler = (e) => {
        setPlaying(!isPlaying);
    }

    return(
            <>
                <div title={"Reproducir " + track.name} tabIndex={0} className='songButton' onDoubleClick={songClickHandler}>
                    <div className="playContainer" onClick={songClickHandler}>
                        <div className="songPlayButton" style={{ backgroundImage:"url("+track.album.images[2].url+")" }}> <FaPlay className="playButton"/> </div>
                    </div>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='nameAuthorContainer col d-flex flex-column flex-md-row justify-content-md-between align-items-md-center'>
                                <div title={track.name} className="name">{track.name}</div>
                                <div title={track.artists[0].name} className="author">{track.artists[0].name}</div>
                            </div>
                            <div title={track.album.name} className='album col-2 '>{track.album.name}</div>
                            <div title={"Duración"} className='time col-3 col-md-2 d-flex justify-content-center'>{timeMIN}:{timeMS}</div>
                            <div className='col-md-1 col-2 d-flex justify-content-center'>
                                <Options track={track} playLists={playLists} playlistId={playlistId} setFeedback={setFeedback}/>
                            </div>
                        </div>
                    </div>
                    
                </div>
                {feedback !== "" ? (
                    <ClickAwayListener onClickAway={onClickAway}>
                                                      <div className="CustomSnackbar" {...getRootProps()}>
                                                        {feedback}
                                                      </div>
                                                    </ClickAwayListener>
                                                  ) : null}  
            </>
    );
}

function Options({track, playLists, playlistId, setFeedback}){
    

    

    

    const handleOpen = () => {
        setFeedback(true);
    };


    const favoritesClickHandler = (e) => {
        addTrackToFavorites(track).then(
            setFeedback("Canción añadida a favoritos.")
        )
    }

    const eliminarClickHandler = (playlistId) => {
        removeTrackFromPlayList(track, playlistId).then(
            setFeedback("Canción eliminada de la playlist.")
        )
    }

    const listClickHandler = (playList) => {
        console.log(track);
        console.log(playList);
        addTrackToPlayList(track, playList).then(
            setFeedback("Canción añadida a la playlist.")
        )
    }

    const newListClickHandler = (e) => {
        
    }

    const menuItemClassName = ({ hover }) =>
        hover ? 'menuItemHover' : 'menuItem';

    return(
        <Menu 
            menuButton={<MenuButton tabIndex={0} title="Opciones" className={"optionsButton"}><FaEllipsisVertical  className="options"/></MenuButton>} 
            menuClassName="optionsMenu"
            viewScroll="close"
            position="auto"
            transition>
                                <MenuItem tabIndex={"0"} className={menuItemClassName} title={"Añadir a canciones favoritas"} onClick={() => favoritesClickHandler()}><button>Añadir a canciones favoritas</button></MenuItem>
                                {playlistId?
                                <MenuItem tabIndex={"0"} className={menuItemClassName} title={"Eliminar de la playlist"} onClick={() => eliminarClickHandler(playlistId)}><button>Eliminar de la playlist</button></MenuItem>
                                :null}
                                <MenuDivider />

                                {playLists ?
                                    playLists.map((playList) => (
                                        <MenuItem className={menuItemClassName} tabIndex={"0"} title={"Añadir a "+ playList.name} onClick={() => listClickHandler(playList)} key={playList.id}><button>Añadir a {playList.name}</button></MenuItem>
                                    ))
                                : <></>
                                }                        
                                
                            </Menu>
    );
}