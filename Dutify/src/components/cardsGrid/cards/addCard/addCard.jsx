import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import "../cardsStyle.css";
import "./addCardStyle.css";
import { useState } from "react";

function AddCard() {
  const [modalAbierto, setModalAbierto] = useState(false);

  //Para que se abra el modal de crear lista se deben añadir propiedades
  return (
    <button
      className="card"
      id="card_container"
      name="addCard"
      title="Crear nueva lista"
      data-bs-toggle="modal"
      data-bs-target="#listModal"
      aria-labelledby="addCardLabel"
      aria-controls="listModal"
      aria-haspopup="dialog"
      aria-expanded="false"
      onClick={() => {
        document.getElementsByName("addCard")[0].setAttribute("aria-expanded", "true");
      }}
    >
      <div className="d-flex flex-column align-items-center justify-content-center cards-overlay fs-3">
        <IoMdAddCircle className="addButton" />
        <h2 className="addCard-title cards-title" id="addCardLabel">Nueva lista</h2>
      </div>
    </button>
  );
}

export default AddCard;
