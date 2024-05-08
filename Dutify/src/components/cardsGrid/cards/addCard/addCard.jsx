import React from "react";
import { useReducer } from "react";
import { IoMdAddCircle } from "react-icons/io";
import '../cardsStyle.css';
import './addCardStyle.css';

function PlaceHolder(state, action){

}

function handleClick(){
  dispatch({

  });
}

function AddCard({children}){

    const [state, dispatch] = useReducer(PlaceHolder , [])

    return (
        <div className='card' id="card_container" 
            alt="Prueba">
          <div className='d-flex flex-column align-items-center justify-content-center cards-overlay fs-3'>
            <IoMdAddCircle className="addButton"/>
            <p className="addCard-title cards-title">{children}</p>
          </div>
        </div>
      );
}

export default AddCard;