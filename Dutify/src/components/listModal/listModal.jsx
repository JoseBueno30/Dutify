import React from "react";
import { useState, useContext, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import {
  createPlaylist,
  changePlaylistName,
  sleep,
} from "../../spotifyApi/SpotifyApiCalls";
import "./listModalStyle.css";
import { FeedbackHandlerContext } from "../../App";

function ListModal({ playlist }) {
  const [listName, setListName] = useState(playlist ? playlist.name : "");
  const [listPublic, setListPublic] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  const changeFeedback = useContext(FeedbackHandlerContext).changeFeedback;

  useEffect(() => {
    const modal = document.getElementById("listModal");
    modal.addEventListener("hidden.bs.modal", hideHandler);
    modal.setAttribute("aria-hidden", "false");

    return () => {
      modal.removeEventListener("hidden.bs.modal", hideHandler);
    };
  },[]);

  function esSoloEspacios(texto) {
    return /^\s*$/.test(texto);
  }

  const listNameChangeHandler = (e) => {
    setListName(e.target.value);
  };

  const listPublicChangeHandler = (e) => {
    setListPublic(e.target.checked);
  };

  const hideHandler = () => {
    setListName("");
    setListPublic(false);
    setErrorVisibility(false);
    setCanSubmit(true);
  }
  
  const clickHandler = (e) => {
    e.preventDefault();

    if (listName === undefined || listName === "" || esSoloEspacios(listName)) {
      setErrorVisibility(true);
      document.getElementById("inputName").setAttribute("aria-describedby","errorText")
      document.getElementById("inputName").focus();
    } else {
      setCanSubmit(false);
      setErrorVisibility(false);
      document.getElementById("inputName").removeAttribute("aria-describedby");
      if (playlist) {
        console.log(playlist);

        // Close modal
        document.getElementById("listModal").setAttribute("style", "display: none");
        document.getElementById("listModal").setAttribute("aria-hidden", "true");
        
        changePlaylistName(playlist.id, listName)
        .then(status => {
          changeFeedback(status),
          sleep(2500).then(() => {
              window.location.href = "/listas/playlist?playlistId=" + playlist.id;
            })
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createPlaylist(listName, listPublic)
          .then((playlist) => {
            window.location.href = "/listas/playlist?playlistId=" + playlist.id;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="listModal"
      tabIndex="-1"
      aria-description={"Dialogo para " + (playlist ? "editar" : "crear") + " una lista de reproducción"}
      aria-hidden="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="helpModalLabel">
              {playlist ? "Editar nombre de la lista" : "Crear nueva lista"}
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
            <form onSubmit={clickHandler}>
              <div className={"mb-3 w-75"}>
                <label htmlFor="inputName" className={"form-label"}>
                  Nombre de la lista *
                </label>
                <input
                  type="text"
                  className={
                    "form-control " + (errorVisibility ? "is-invalid" : "")
                  }
                  id="inputName"
                  value={listName}
                  onChange={listNameChangeHandler}
                  maxLength={20}
                  disabled={!canSubmit}
                />
                <p
                  className={"error-text " + (!errorVisibility ? "d-none" : "")}
                  id="errorText"
                >
                  ❌El nombre de la lista no puede estar vacío.❌
                </p>
              </div>
              {playlist ? (
                <></>
              ) : (
                <>
                  <div className="mb-4 w-75">
                    <div className="form-check form-switch ps-0">
                      <label className="form-check-label mb-1" tabIndex={0}>
                        Privacidad
                      </label>
                      <br />
                      <input
                        className="form-check-input ms-1"
                        aria-label="Privacidad"
                        type="checkbox"
                        role="switch"
                        id="listPublic"
                        onChange={listPublicChangeHandler}
                        checked={listPublic}
                      />
                      <label
                        className="form-check-label ps-3"
                        htmlFor="listPublic"
                      >
                        {listPublic ? "Pública" : "Privada"}
                      </label>
                    </div>
                  </div>
                </>
              )}
              <div className="mb-2 d-flex justify-content-start">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={clickHandler}
                >
                  {playlist ? "Guardar cambios" : "Crear lista"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListModal;
