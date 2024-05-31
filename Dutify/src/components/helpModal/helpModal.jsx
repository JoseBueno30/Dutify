import React from "react";
import "./helpModalStyle.css";
import { IoClose } from "react-icons/io5";

function HelpModal() {
  return (
    <div
      className="modal fade"
      id="helpModal"
      tabIndex="-1"
      aria-labelledby="helpModalLabel"
      aria-description="Dialogo de ayuda de la aplicación"
      aria-hidden="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="helpModalLabel">
              ¿Qué es Dutify?
            </h1>
            <button
              type="button"
              className="close-button"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <IoClose size={35}/>
            </button>
          </div>
          <article className="modal-body" aria-label="Descripción de Dutify">
            <p>
              Dutify es una aplicación web que te permite buscar y reproducir
              tus canciones favoritas de Spotify. Las principales
              funcionalidades de Dutify son:
            </p>
            <ul>
              <li>Buscar y reproducir canciones.</li>
              <li>Reproducir canciones en modo aleatorio o repetición.</li>
              <li>Crear, editar y eliminar listas de reproducción.</li>
              <li>Añadir o eliminar canciones de tus listas de reproducción.</li>
              <li>Reproducir listas filtradas por género o temas.</li>
            </ul>
          </article >
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
