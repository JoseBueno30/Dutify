import React, { useReducer} from "react";
import "./listCardStyle.css";

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
      className="card"
      id="listCard_container"
      alt={listName + "_Imagen"}
    >
      <img src={background} className="card-img" />
      <div className="listCard-overlay title-fade h-50 fs-2">
        <p className="listCard-title">{listName}</p>
      </div>
    </div>
  );
}

export default ListCard;
