import React from "react";
import { useState } from "react";
import { FaEllipsisVertical, FaPlay, FaPause } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import "./addSongButtonStyle.css";


export default function AddSongButton({name, artistName, albumName, image, time_ms, playlistId}){


    const addSongClickHandler = (e) => {
        window.location.href = "/Dutify/busqueda?playListId="+ playlistId +"&query=";
    }

    const addButtonKeydownHandler = (event) => {
        if (event.key === "Enter" || event.key === " " ) {
            addSongClickHandler(event);
        }
      };

    return(
                <div title={"Añadir nueva canción"} tabIndex={0} className='addSongButton' onClick={addSongClickHandler} onKeyDown={addButtonKeydownHandler}>
                    <div>
                        <IoMdAddCircle className="addSongIcon"/>
                    </div>
                    <div aria-hidden="true">
                        Añadir nueva canción
                    </div>
                    
                </div>
    );
}