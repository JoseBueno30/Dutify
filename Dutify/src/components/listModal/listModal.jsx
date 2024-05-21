import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { createPlaylist, changePlaylistName } from "../../spotifyApi/SpotifyApiCalls";

function ListModal({ playlist }) {
  const [listName, setListName] = useState(playlist? playlist.name : "");
  const [listPublic, setListPublic] = useState(false);

  const listNameChangeHandler = (e) => {
    setListName(e.target.value);
  };

  const listPublicChangeHandler = (e) => {
    setListPublic(e.target.checked);
  };

  const clickHandler = () => {
    if (playlist){
      console.log(playlist)
      changePlaylistName(playlist.id, listName)
        .then(() => {
          window.location.href = "/listas/playlist?playlistId=" + playlist.id;
        })
        .catch((error) => {
          console.error(error);
        });
    }else{
      createPlaylist(listName, listPublic)
        .then((playlist) => {
          window.location.href = "/listas/playlist?playlistId=" + playlist.id;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
    
  return (
    <div
      className="modal fade"
      id="listModal"
      tabIndex="-1"
      aria-labelledby="listModalLabel"
      aria-hidden="true"
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
            <form>
              <div className="mb-3 w-75">
                <label htmlFor="inputName" className="form-label">
                  Nombre de la lista
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  value={listName}
                  onChange={listNameChangeHandler}
                />
              </div>
              {playlist? <></>
              :
              <>
                <div className="mb-4 w-75">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="listPublic"
                      onChange={listPublicChangeHandler}
                    />
                    <label className="form-check-label" htmlFor="listPublic">
                      Pública
                    </label>
                  </div>
              </div>
              </>
              }
              <div className="mb-2 d-flex justify-content-start">
                <button type="button" className="btn btn-primary" onClick={clickHandler}>
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
