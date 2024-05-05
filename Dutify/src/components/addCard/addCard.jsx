import React from "react";
import { useReducer } from "react";
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
        <div className='card' id="main_container" 
            alt="Prueba">
          <div className='overlay fs-3'>
            <p className="addCard-title">{children}</p>
            <div className="circulo">
              <div className="cruz">
                <div className="horizontal"></div>
                <div className="vertical"></div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default AddCard;