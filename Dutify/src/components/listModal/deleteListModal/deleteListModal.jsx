import React from "react";
import { useState,useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { unfollowPlaylist, sleep } from "../../../spotifyApi/SpotifyApiCalls";

function DeleteListModal({ playlist }) {

  useEffect(() => {
    const modal = document.getElementById("deleteListModal");
    modal.addEventListener("hidden.bs.modal", hideHandler);
    modal.setAttribute("aria-hidden", "false");

    return () => {
      modal.removeEventListener("hidden.bs.modal", hideHandler);
    };
  },[]);

  const hideHandler = () => {
    document.getElementsByName("deleteList")[0].setAttribute("aria-expanded", "false");
  }

  const comfirmDeleteClickHandler = (e) => {
    unfollowPlaylist(playlist.id).then(() => {window.location.href = "/Listas"});
  };

  return (
    <div
      className="modal fade"
      id="deleteListModal"
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="deleteModalLabel">
                {"¿Eliminar '" + playlist.name + "' de tu biblioteca?"}
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
            <div className={"mb-3 w-75"} tabIndex={0}>{"La Playlist '" + playlist.name + "' se eliminará de tu biblioteca."}</div>

            <div className="mb-2 d-flex justify-content-evenly">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Cancelar"
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
