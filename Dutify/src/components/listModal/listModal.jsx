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
  }, []);

  function esSoloEspacios(texto) {
    return /^\s*$/.test(texto);
  }

  const listNameChangeHandler = (e) => {
    setListName(e.target.value);
  };

  const listPublicChangeHandler = (e) => {
    setListPublic(!listPublic);
  };

  const hideHandler = () => {
    setListName("");
    setListPublic(false);
    setErrorVisibility(false);
    setCanSubmit(true);
    if (!playlist) {
      document
        .getElementsByName("addCard")[0]
        .setAttribute("aria-expanded", "false");
    } else {
      document
        .getElementsByName("cambiarNombre")[0]
        .setAttribute("aria-expanded", "false");
    }
  };

  const clickHandler = (e) => {
    e.preventDefault();

    if (listName === undefined || listName === "" || esSoloEspacios(listName)) {
      setErrorVisibility(true);
      document
        .getElementById("inputName")
        .setAttribute("aria-describedby", "errorText");
      document.getElementById("inputName").focus();
    } else {
      setCanSubmit(false);
      setErrorVisibility(false);
      document.getElementById("inputName").removeAttribute("aria-describedby");
      if (playlist) {
        console.log(playlist);

        // Close modal
        document
          .getElementById("listModal")
          .setAttribute("style", "display: none");
        document
          .getElementById("listModal")
          .setAttribute("aria-hidden", "true");

        changePlaylistName(playlist.id, listName)
          .then((status) => {
            changeFeedback(status),
              sleep(5000).then(() => {
                window.location.href =
                  "/listas/playlist?playlistId=" + playlist.id;
              });
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
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="listModalLabel"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="listModalLabel">
              {playlist ? "Editar nombre de la lista" : "Crear nueva lista"}
            </h1>
            <button
              type="button"
              className="close-button"
              data-bs-dismiss="modal"
              aria-label="Cerrar dialogo"
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
                  name="inputName"
                  value={listName}
                  onChange={listNameChangeHandler}
                  maxLength={20}
                  disabled={!canSubmit}
                  aria-required="true"
                  aria-invalid={errorVisibility}
                  aria-errormessage="errorText"
                />
                <p
                  className={"error-text " + (!errorVisibility ? "d-none" : "")}
                  id="errorText"
                >
                  ❌El nombre de la lista no puede estar vacío❌
                </p>
              </div>
              {playlist ? (
                <></>
              ) : (
                <>
                  <p className="mb-1" id="privacyLabel">Privacidad</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="listPrivate"
                      id="privateRadio"
                      checked={!listPublic}
                      onChange={listPublicChangeHandler}
                      aria-labelledby="privacyLabel privateRadio"
                    />
                    <label className="form-check-label" htmlFor="listPrivacity">
                      Privada
                    </label>
                  </div>
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="listPrivacity"
                      id="publicRadio"
                      checked={listPublic}
                      onChange={listPublicChangeHandler}
                      aria-labelledby="privacyLabel publicRadio"
                    />
                    <label className="form-check-label" htmlFor="listPrivacity">
                      Pública
                    </label>
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
