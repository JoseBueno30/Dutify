import React from "react";
import { useState } from "react";
import "./songInfoStyle.css";


export default function SongInfo({showAddButton = false}){
    const [isPlaying, setPlaying] = useState(false);

    const songClickHandler = (e) => {
        setPlaying(!isPlaying);
    }

    return(
                <div tabIndex={0} className='songInfo' onDoubleClick={songClickHandler} aria-label="Leyenda canciones" aria-description="Leyenda canciones">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='nameAuthorContainer col d-flex flex-row justify-content-between align-items-center'>
                                <div className="name">Nombre</div>
                                <div className="author">Artista</div>
                            </div>
                            <div className='album col-2 align-content-center'>Álbum</div>
                            <div className="timeInfo col-3 col-md-2 d-flex justify-content-center aling-content-center">Duracion</div>
                            {showAddButton ? <div className='col-1 d-flex justify-content-center'></div> : <></>}
                            <div className='col-md-1 col-2 d-flex justify-content-center'>
                            </div>
                        </div>
                    </div>
                    
                </div>
    );
}