import React from "react"
import { useReducer } from "react";
import "./styles/genreCardStyle.css"

function PlaceHolder(state, action){

}

function handleClick(){
  dispatch({

  });
}

function GenreCard({genreName, background}){

    const [state, dispatch] = useReducer(PlaceHolder , [])

    return (
        <div className={'card m-3 w-100 h-auto ' + background} id="main_container" 
            alt={genreName + '_Imagen'}>
          <div className={'card-img-overlay ' + background + '-img'}>
            <p >{genreName}</p>
          </div>
        </div>
      );
}

export default GenreCard