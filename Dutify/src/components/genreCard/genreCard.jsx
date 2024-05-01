import React from "react"
import { useReducer } from "react";
import "./genreCardStyle.css"

function PlaceHolder(state, action){

}

function handleClick(){
  dispatch({

  });
}

function GenreCard({genreName, background}){

    const [state, dispatch] = useReducer(PlaceHolder , [])

    return (
        <div className={'card ' + background} id="genre_container" 
            alt={genreName + '_Imagen'}>
          <div className={'genre-overlay ' + background + '-img genre-img'}>
            <p className="genre-title">{genreName}</p>
          </div>
        </div>
      );
}

export default GenreCard