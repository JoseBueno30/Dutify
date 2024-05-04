import React, { useReducer} from "react";
import "./listCardStyle.css";

function PlaceHolder(state, action) {
  
}

function handleClick() {
  dispatch({

  });
}

function ListCard({ listName, listImage }) {

  const [state, dispatch] = useReducer(PlaceHolder, []);

  return (
    <div
      className="card w-100 h-auto m-3"
      id="listCard_container"
      alt={listName + "_Imagen"}
    >
      <img src={listImage} className="card-img" />
      <div className="listCard-overlay title-fade h-50">
        <p className="listCard-title">{listName}</p>
      </div>
    </div>
  );
}

export default ListCard;
