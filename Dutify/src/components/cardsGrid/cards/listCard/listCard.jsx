import React, { useReducer} from "react";
import "./listCardStyle.css";
import "../cardsStyle.css";

function PlaceHolder(state, action) {
  
}

function handleClick() {
  dispatch({

  });
}

function ListCard({ listName, background }) {

  const [state, dispatch] = useReducer(PlaceHolder, []);

  return (
    <div
      className="card "
      id="card_container"
      alt={listName + "_Imagen"}
    >
      <img src={background} className="card-img"/>
      <div className="cards-overlay title-fade">
        <p className="cards-title">{listName}</p>
      </div>
    </div>
  );
}

export default ListCard;
