import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { unfollowPlaylist, sleep } from "../../../spotifyApi/SpotifyApiCalls";

function DeleteListModal({ playlist }) {
  const comfirmDeleteClickHandler = (e) => {
    unfollowPlaylist(playlist).then(sleep(500).then(() => {window.location.href = "/Listas"}));
  };

  return (
    <div
      className="modal fade"
      id="deleteListModal"
      tabIndex="-1"
      aria-labelledby="listModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="helpModalLabel">
                {"¿Eliminar " + playlist.name + " de tu biblioteca?"}
            </h1>
            <button
              type="button"
              className="close-button"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <IoClose size={35} />
            </button>
          </div>
          <div className="modal-body">
            <div className={"mb-3 w-75"} tabIndex={0}>{playlist.name + " se eliminará de tu biblioteca"}</div>

            <div className="mb-2 d-flex justify-content-evenly">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Cancel"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={comfirmDeleteClickHandler}
              >
                Eliminar playlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteListModal;
