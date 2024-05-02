import React from "react";
import { useReducer } from "react";
import "./genreCardStyle.css";

function PlaceHolder(state, action) {}

function handleClick() {
  dispatch({});
}

function GenreCard({ genreName, background }) {
  const [state, dispatch] = useReducer(PlaceHolder, []);

  return (
    <div
      className={"card m-2 " + background}
      id="genre_container"
      alt={genreName + "_Imagen"}
    >
      <div className="card-body">
        <div className={"genre-overlay fs-2 " + background + "-img genre-img"}>
          <p className="genre-title">{genreName}</p>
        </div>
      </div>
    </div>
  );
}

export default GenreCard;
