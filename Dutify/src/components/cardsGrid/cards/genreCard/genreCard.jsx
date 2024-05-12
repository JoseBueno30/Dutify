import React from "react";
import { useReducer } from "react";
import '../cardsStyle.css';
import "./genreStyle.css";

function PlaceHolder(state, action) {}

function handleClick() {
  dispatch({});
}

function GenreCard({ genreName, background, id}) {
  const [state, dispatch] = useReducer(PlaceHolder, []);

  return (
    <div
      className={"card " + background}
      id="card_container"
      alt={genreName + "_Imagen"}
    >
      <div className="card-body">
        <div id={id} className={"cards-overlay  " + background + "-img genre-img"}>
          <p className="cards-title">{genreName}</p>
        </div>
      </div>
    </div>
  );
}

export default GenreCard;
