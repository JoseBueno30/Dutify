import React, { useEffect } from "react";
import "./helpModalStyle.css";
import { IoClose } from "react-icons/io5";


function HelpModal() {
  useEffect(() => {
    const modal = document.getElementById("helpModal");
    modal.addEventListener("hidden.bs.modal", hideHandler);
    modal.setAttribute("aria-hidden", "false");
  
    return () => {
      modal.removeEventListener("hidden.bs.modal", hideHandler);
    };
  }, []);
  
  function hideHandler() {
    document.getElementById("helpIcon").setAttribute("aria-expanded", "false");
  }

  return (
    <div
      className="modal fade"
      id="helpModal"
      tabIndex="-1"
      aria-labelledby="helpModalLabel"
      aria-description="Dialogo de ayuda de la aplicación"
      role="dialog"
      aria-modal="true"
      aria-hidden="true" 
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <header className="modal-header">
            <h1 className="modal-title fs-5" id="helpModalLabel">
              ¿Qué es Dutify?
            </h1>
            <button
              type="button"
              className="close-button"
              data-bs-dismiss="modal"
              aria-label="Cerrar dialogo"
            >
              <IoClose size={35}/>
            </button>
          </header>

          <div className="modal-body" aria-description="Descripción de Dutify" tabIndex={0} role="article">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
