import React from "react";
import { FaEllipsisVertical, FaPlay } from "react-icons/fa6";
import "./songButtonStyle.css";


export default function SongButton(){
    cont 
    return(
            <>
            <div className='song'>
                <div className="playContainer">
                    <image></image>
                    <div className="playButton"><FaPlay/></div>
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col ms-3 d-flex flex-column flex-md-row justify-content-md-between align-items-md-center'>
                            <div className="name">Nombre</div>
                            <div className="author">autor</div>
                        </div>
                        <div className='album col'>album</div>
                        <div className='time col-3 col-md-2'>mm:ss</div>
                        <div className='options col-md-1 col-2 '>
                                <FaEllipsisVertical className="border"/>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="border optionsLabel">a</div>
            </>
    
    );
}