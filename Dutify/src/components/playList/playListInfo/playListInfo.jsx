import React, { useEffect, useState, useContext } from "react";
import "./playListInfoStyle.css";
import { FaGear, FaHeart, FaRegHeart } from "react-icons/fa6";
import PlayListPlayer from "./playListPlayer/playListPlayer";
import { useThemeContext } from "../../../context/ThemeContext";
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuDivider,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export default function PlayListInfo({
  playList,
  queueFunction,
  isPlaying,
  setPlaying,
  owned,
  followed,
  followPlaylistHandler,
  unfollowPlaylistHandler,
}) {
  const { contextTheme, setContextTheme } = useThemeContext();
  const timeMIN = Math.trunc(playList.duration_ms / 60000);
  const timeMS = Math.trunc((playList.duration_ms / 1000) % 60);

  return (
    <div className="playListInfoContainer d-flex flex-column container-fluid" aria-description="Información de la playlist">
      <div className="d-flex justify-content-xl-evenly  justify-content-center align-items-center ">
        <p
          tabIndex={0}
          title={playList.name}
          className="playListName "
          aria-description="nombre playlist"
        >
          {playList.name}
        </p>
      </div>

      {playList.images ? (
        <img className="playListImage" src={playList.images[0].url} alt={"Imagen portada de la playlist: " + playList.name}></img>
      ) : (
        <img
          className="playListImage"
          src={"/Dutify/assets/placeholder-img-" + contextTheme + ".png"}
          alt="Imagen de la playlist"
        ></img>
      )}

      <div className="playListInfo d-flex align-items-stretch justify-content-evenly">
        <p tabIndex={0}>{playList.tracks.total + " canciones"}</p>

        {owned ? (
          <Options />
        ) : (
          <>
            {/* ponner los onClick al boton no a los iconos */}
            <button
                className="playListFollowButton"
                aria-label="Seguir playlist"
                title={ (followed ? "Dejar de seguir" : "Seguir") +  " playlist"}
                aria-pressed = {followed}
                onClick={followed ? () => unfollowPlaylistHandler() : () => followPlaylistHandler()}
              >
                {followed ? <FaHeart className="followed" /> : <FaRegHeart />}
              </button>
          </>
        )}
      </div>
      <PlayListPlayer
        queueFunction={queueFunction}
        playListId={playList.id}
        isPlaying={isPlaying}
        setPlaying={setPlaying}
        className="playListPlayer"
      />
    </div>
  );
}

function Options({}) {
  const menuItemClassName = ({ hover }) =>
    hover ? "menuItemHover" : "menuItem";

  return (
    <Menu
      menuButton={
        <MenuButton tabIndex={0} className={"playListOptionsButton"} title="Abrir menú configuración">
          <FaGear className="playListOptions" />
        </MenuButton>
      }
      menuClassName="optionsMenu"
      viewScroll="close"
      gap={6}
      align="start"
      transition
    >
      <MenuItem className={menuItemClassName}>
        <button
          name="cambiarNombre"
          title="Cambiar nombre de la lista"
          data-bs-toggle="modal"
          data-bs-target="#listModal"
          aria-controls="listModal"
          aria-haspopup="dialog"
          aria-expanded="false"
          onClick={() => {
            document.getElementsByName("cambiarNombre")[0].setAttribute("aria-expanded", "true");
          }}
        >
          Cambiar nombre
        </button>
      </MenuItem>
      <MenuItem className={menuItemClassName}>
        <button
          data-bs-toggle="modal"
          name="deleteList"
          title="Eliminar playlist" 
          data-bs-target="#deleteListModal"
          aria-controls="deleteListModal"
          aria-haspopup="dialog"
          aria-expanded="false"
          onClick={() => {
            document.getElementsByName("deleteList")[0].setAttribute("aria-expanded", "true");
          }}
        >
          Eliminar playlist
        </button>
      </MenuItem>
    </Menu>
  );
}
