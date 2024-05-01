import React from "react";
import { useState } from "react";
import { FaEllipsisVertical, FaPlay } from "react-icons/fa6";
import "./songButtonStyle.css";


export default function SongButton(){
    
    const[areOptionsVisible, setOptionsVisible] = useState(false);

    const optionsClickHandler = (e) => {
        setOptionsVisible(!areOptionsVisible)
    }

    const songClickHandler = (e) => {
    }

    return(
            <>
            <div className='song' onDoubleClick={songClickHandler}>
                <div className="playContainer" onClick={songClickHandler}>
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
                        <div className='col-md-1 col-2 d-flex justify-content-center' onClick={optionsClickHandler}>
                                <FaEllipsisVertical className="options"/>
                        </div>
                    </div>
                </div>
                
            </div>
            {areOptionsVisible &&
                <OptionsLabel setOptionsVisible={setOptionsVisible}/>
            }
            </>
    );
}

function OptionsLabel({setOptionsVisible}){

    const[areListsVisible, setListsVisible] = useState(false);

    const mouseLeaveHandler = (e) => {
        setOptionsVisible(false);
    }

    const listsClickHandler = (e) => {
        setListsVisible(!areListsVisible)
    }

    return(
        <div onMouseLeave={mouseLeaveHandler}>
            <div className="optionsLabel " >
                <div className="option p-1">Añadir a canciones favoritas</div>
                <div className="option d-flex justify-content-between" onClick={listsClickHandler}>
                    <div className="p-1">Añadir a la lista</div>
                    <div className="p-1">{">"}</div>
                </div>
            </div>
            {areListsVisible &&
                <ListsLabel setListsVisible={setListsVisible}/>
            }
        </div>
    );
}

function ListsLabel({setListsVisible}){
    const mouseLeaveHandler = (e) => {
        setListsVisible(false);
    }

    const listClickHandler = (e) => {

    }

    const newListClickHandler = (e) => {
        
    }

    return(
        <>
            <div className="listsLabel " onMouseLeave={mouseLeaveHandler}>
                <div className="option p-1" onClick={listClickHandler}>Lista 1</div>
                <div className="option p-1" onClick={listClickHandler}>Lista 2</div>
                <div className="option p-1" onClick={listClickHandler}>Lista 3</div>
                <div className="option p-1" onClick={newListClickHandler}>Nueva Lista</div>
            </div>
            
        </>
    );
}