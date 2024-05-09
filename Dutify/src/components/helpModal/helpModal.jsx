import React from "react";

function HelpModal() {
  return (
    <div
      className="modal fade"
      id="helpModal"
      tabIndex="-1"
      aria-labelledby="helpModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="helpModalLabel">
              ¿Qué es Dutify?
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Dutify es una aplicación web que te permite buscar y reproducir
              tus canciones favoritas de Spotify. Las principales
              funcionalidades de Dutify son:
            </p>
            <ul>
              <li>Buscar y reproducir canciones.</li>
              <li>Reproducir canciones en modo aleatorio o repetición.</li>
              <li>Crear y editar nuevas listas de reproducción.</li>
              <li>Añadir o eliminar canciones de tus listas de reproducción.</li>
              <li>Reproducir listas filtradas por género o temas.</li>
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
