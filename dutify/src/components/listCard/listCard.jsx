import React, { useReducer} from "react";
import "./styles/listCardStyle.css";

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
      className="card w-100 h-auto"
      id="main_container"
      alt={listName + "_Imagen"}
    >
      <img src={listImage} className="card-img" />
      <div className="card-img-overlay title h-50">
        <p>{listName}</p>
      </div>
    </div>
  );
}

export default ListCard;
