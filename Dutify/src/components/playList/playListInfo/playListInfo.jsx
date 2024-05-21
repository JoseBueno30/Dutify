import React from "react";
import "./playListInfoStyle.css";
import { FaGear } from "react-icons/fa6";
import PlayListPlayer from "./playListPlayer/playListPlayer";
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuDivider,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { FcButtingIn } from "react-icons/fc";

export default function PlayListInfo({ playList }) {
  const timeMIN = Math.trunc(playList.duration_ms / 60000);
  const timeMS = Math.trunc((playList.duration_ms / 1000) % 60);

  return (
    <div className="playListInfoContainer d-flex flex-column container-fluid">
      <div className="d-flex justify-content-xl-evenly  justify-content-center align-items-center ">
        <p title={playList.name} className="playListName ">
          {playList.name}
        </p>
      </div>
      {playList.images ? (
        <img className="playListImage" src={playList.images[0].url}></img>
      ) : (
        <img className="playListImage" src="/assets/placeholder-img.png"></img>
      )}
      <div className="playListInfo d-flex align-items-stretch justify-content-evenly">
        <p>{playList.tracks.total + " canciones"}</p>
        <Options />
      </div>
      <PlayListPlayer className="playListPlayer" />
    </div>
  );
}

function Options({}) {
  const cambiarNombreClickHandler = (e) => {};

  const eliminarClickHandler = (e) => {};

  const menuItemClassName = ({ hover }) =>
    hover ? "menuItemHover" : "menuItem";

  return (
    <Menu
      menuButton={
        <MenuButton tabIndex={0} className={"playListOptionsButton"}>
          <FaGear className="playListOptions" />
        </MenuButton>
      }
      menuClassName="optionsMenu"
      viewScroll="close"
      gap={6}
      align="start"
      transition
    >
      <MenuItem
        className={menuItemClassName}
        onClick={cambiarNombreClickHandler}
      >
        <button>Cambiar nombre</button>
      </MenuItem>
      <MenuItem className={menuItemClassName} onClick={eliminarClickHandler}>
        <button>Eliminar playlist</button>
      </MenuItem>
    </Menu>
  );
}
