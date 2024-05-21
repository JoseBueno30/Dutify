import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import "../cardsStyle.css";
import "./addCardStyle.css";

function AddCard() {

  //Para que se abra el modal de crear lista se deben añadir propiedades
  return (
    <button
      className="card"
      id="card_container"
      title="Crear lista"
      data-bs-toggle="model"
      data-bs-target="#listModal"
    >
      <div className="d-flex flex-column align-items-center justify-content-center cards-overlay fs-3">
        <IoMdAddCircle className="addButton" />
        <p className="addCard-title cards-title">Nueva lista</p>
      </div>
    </button>
  );
}

export default AddCard;
