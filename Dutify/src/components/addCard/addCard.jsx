import React from "react";
import { useReducer } from "react";
import './addCardStyle.css';
import { IoMdAddCircle } from "react-icons/io";

function PlaceHolder(state, action){

}

function handleClick(){
  dispatch({

  });
}

function AddCard({children}){

    const [state, dispatch] = useReducer(PlaceHolder , [])

    return (
        <div className='card' id="main_container" 
            alt="Prueba">
          <div className='d-flex flex-column align-items-center justify-content-center overlay fs-3'>
            <IoMdAddCircle className="addButton"/>
            <p className="addCard-title">{children}</p>
          </div>
        </div>
      );
}

export default AddCard;