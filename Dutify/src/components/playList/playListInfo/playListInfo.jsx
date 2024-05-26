import React, { useEffect, useState, useContext } from "react";
import "./playListInfoStyle.css";
import { FaGear, FaHeart, FaRegHeart } from "react-icons/fa6";
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

export default function PlayListInfo({
  playList,
  queueFunction,
  isPlaying,
  setPlaying,
  owned,
  followed,
  followPlaylistHandler,
  unfollowPlaylistHandler
}) {
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
        <img
          className="playListImage"
          src={"/assets/placeholder-img-light.png"}
        ></img>
      )}

      <div className="playListInfo d-flex align-items-stretch justify-content-evenly">
        <p>{playList.tracks.total + " canciones"}</p>

        {owned ? (
          <Options />
        ) : (
          <>
            {/* ponner los onClick al boton no a los iconos */}
            {followed ? (
              <button className="playListFollowButton" onClick={() => unfollowPlaylistHandler()}>
                <FaHeart className="followed"/>
              </button>
            ) : (
              <button className="playListFollowButton" onClick={() => followPlaylistHandler()}>
                <FaRegHeart />
              </button>
            )}
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
      <MenuItem className={menuItemClassName}>
        <button data-bs-toggle="modal" data-bs-target="#listModal">
          Cambiar nombre
        </button>
      </MenuItem>
      <MenuItem className={menuItemClassName}>
        <button data-bs-toggle="modal" data-bs-target="#deleteListModal">
          Eliminar playlist
        </button>
      </MenuItem>
    </Menu>
  );
}
