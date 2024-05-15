import React from "react";
import { useState } from "react";
import { FaEllipsisVertical, FaPlay, FaPause } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import "./addSongButtonStyle.css";


export default function AddSongButton({name, artistName, albumName, image, time_ms}){


    const addSongClickHandler = (e) => {
        console.log("Añadir cancion");
        window.location.href = "/busqueda?query=";
    }

    return(
                <div title={"Añadir nueva canción"} tabIndex={0} className='addSongButton' onClick={addSongClickHandler}>
                    <div>
                        <IoMdAddCircle className="addSongIcon"/>
                    </div>
                    <div>
                        Añadir nueva canción
                    </div>
                    
                </div>
    );
}