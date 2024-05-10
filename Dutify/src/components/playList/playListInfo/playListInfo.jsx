import React from "react";
import "./playListInfoStyle.css"
import { FaGear } from "react-icons/fa6";
import PlayListPlayer from "./playListPlayer/playListPlayer";
import { Menu, MenuItem, MenuButton, SubMenu, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';


export default function PlayListInfo(){
    return(
        <div className="playListInfoContainer d-flex flex-column container-fluid">
            <div className='d-flex justify-content-xl-evenly  justify-content-center align-items-center '>
                <p className="playListName ">ListaDeReproduccion</p>
                <Options/>
            </div>
            <div className="playListImage">
                
            </div>
            <div className="playListInfo d-flex align-items-stretch justify-content-evenly">
                <p>X canciones</p>
                <p>mm:ss</p>
            </div>
            <PlayListPlayer className="playListPlayer"/>
        </div>
    );
}

function Options({}){

    const cambiarNombreClickHandler = (e) => {
        
    }

    const eliminarClickHandler = (e) => {
        
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
                                <MenuItem className={menuItemClassName} onClick={cambiarNombreClickHandler}>Cambiar nombre</MenuItem>
                                <MenuItem className={menuItemClassName} onClick={eliminarClickHandler}>Eliminar playlist</MenuItem>
                                
                            </Menu>
    );
}