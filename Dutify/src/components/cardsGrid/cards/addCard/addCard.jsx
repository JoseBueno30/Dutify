import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import "../cardsStyle.css";
import "./addCardStyle.css";

function AddCard({ type }) {

  var cardText = type == "playlist" ? "Nueva lista" : "Añadir canción";

  //Para que se abra el modal de crear lista se deben añadir propiedades
  return (
    <buttor
      className="card"
      id="card_container"
      data-bs-toggle={type == "playlist" ? "modal" : ""}
      data-bs-target={type == "playlist" ? "#listModal" : ""}
    >
      <div className="d-flex flex-column align-items-center justify-content-center cards-overlay fs-3">
        <IoMdAddCircle className="addButton" />
        <p className="addCard-title cards-title">{cardText}</p>
      </div>
    </buttor>
  );
}

export default AddCard;
