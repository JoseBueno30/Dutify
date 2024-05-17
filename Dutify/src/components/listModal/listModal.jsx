import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import "./listModalStyle.css";

function esSoloEspacios(texto) {
  return /^\s*$/.test(texto);
}

function ListModal({apiCall }) {
  const [listName, setListName] = useState("");
  const [listPublic, setListPublic] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);

  const listNameChangeHandler = (e) => {
    setListName(e.target.value);
  };

  const listPublicChangeHandler = (e) => {
    setListPublic(e.target.checked);
  };

  const clickHandler = () => {
    if (listName === undefined || listName === "" || esSoloEspacios(listName)) {
      setErrorVisibility(true);
      return;
    }
    setErrorVisibility(false);
    apiCall(listName, listPublic)
      .then((id) => {
        window.location.href = "/listas/playlist?playlistId=" + id;
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              Crear nueva lista
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
              <div className={"mb-3 w-75" }>
                <label htmlFor="inputName" className={"form-label"}>
                  Nombre de la lista *
                </label>
                <input
                  type="text"
                  className={"form-control " + (errorVisibility ? "is-invalid" : "")}
                  id="inputName"
                  onChange={listNameChangeHandler}
                />
                <p
                    className={
                      "error-text " + (!errorVisibility ? "d-none" : "")
                    }
                  >
                    El nombre de la lista no puede ser vacío.
                  </p>
              </div>
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
                    {listPublic ? "Pública *" : "Privada *"}
                  </label>
                </div>
              </div>
              <div className="mb-2 d-flex justify-content-start">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={clickHandler}
                >
                  Crear lista
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
