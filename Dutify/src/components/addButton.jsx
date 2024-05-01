import React from "react";
import { useReducer } from "react";
import './addButton.css';

function PlaceHolder(state, action){

}

function handleClick(){
  dispatch({

  });
}

function AddButton({children}){

    const [state, dispatch] = useReducer(PlaceHolder , [])

    return (
        <div className='card m-3 w-100 h-auto' id="main_container" 
            alt="Prueba">
          <div className='overlay'>
            <p>{children}</p>
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

export default AddButton