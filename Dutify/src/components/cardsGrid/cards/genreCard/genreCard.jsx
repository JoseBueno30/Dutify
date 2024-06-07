import React from "react";
import { useReducer } from "react";
import "../cardsStyle.css";
import "./genreStyle.css";

function PlaceHolder(state, action) {}

function handleClick() {
  dispatch({});
}

function GenreCard({ genreName, background }) {
  const [state, dispatch] = useReducer(PlaceHolder, []);

  return (
    <button
      className={"card " + background}
      title={"Ir a género '" + genreName + "'"}
      id="card_container"
      alt={genreName + "_Imagen"}
    >
      <div className="card-body">
        <div className={"cards-overlay  " + background + "-img genre-img"}>
          <h2 className="cards-title" aria-hidden="true" >{genreName}</h2>
        </div>
      </div>
    </button>
  );
}

export default GenreCard;
