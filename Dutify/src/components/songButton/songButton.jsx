import React from "react";
import { useState } from "react";
import { FaEllipsisVertical, FaPlay } from "react-icons/fa6";
import { Menu, MenuItem, MenuButton, SubMenu, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { useThemeContext } from "../../context/ThemeContext";
import "./songButtonStyle.css";


export default function SongButton(){
    const {contextTheme, setContextTheme} = useThemeContext()
    

    

    const songClickHandler = (e) => {
    }

    return(
            <div id="" >
                <div className='songButton' onDoubleClick={songClickHandler}>
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
                            <div className='col-md-1 col-2 d-flex justify-content-center'>
                                <Options/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    );
}

function Options({}){

    const menuItemClassName = ({ hover }) => hover ? 'menuitem-hover' : 'menuitem';

    const mouseLeaveHandler = (e) => {
        
    }

    const listsClickHandler = (e) => {
        
    }

    return(
        // <div onMouseLeave={mouseLeaveHandler} onLostPointerCapture={mouseLeaveHandler}>
        //     <div className="optionsLabel " >
        //         <div className="option p-1">Añadir a canciones favoritas</div>
        //         <div className="option d-flex justify-content-between" onClick={listsClickHandler}>
        //             <div className="p-1">Añadir a la lista</div>
        //             <div className="p-1">{">"}</div>
        //         </div>
        //     </div>
            
        // </div>

        
        <Menu 
            menuButton={<MenuButton className={"optionsButton"}><FaEllipsisVertical className="options"/></MenuButton>} 
            menuClassName="optionsMenu"
            viewScroll="close"
            transition>
                                <MenuItem >Añadir a canciones favoritas</MenuItem>
                                <SubMenu menuClassName="optionsMenu" label="Añadir a la lista">
                                    <MenuItem>Lista 1</MenuItem>
                                    <MenuItem>Lista 1</MenuItem>
                                    <MenuItem>Lista 1</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Nueva Lista</MenuItem>
                                </SubMenu>
                            </Menu>
    );
}

function ListsLabel({}){
    const mouseLeaveHandler = (e) => {
    }

    const listClickHandler = (e) => {

    }

    const newListClickHandler = (e) => {
        
    }

    return(
        <>
            <div className="listsLabel " onTouchStart={mouseLeaveHandler}>
                <div className="option p-1" onClick={listClickHandler}>Lista 1</div>
                <div className="option p-1" onClick={listClickHandler}>Lista 2</div>
                <div className="option p-1" onClick={listClickHandler}>Lista 3</div>
                <div className="option p-1" onClick={newListClickHandler}>Nueva Lista</div>
            </div>
            
        </>
    );
}