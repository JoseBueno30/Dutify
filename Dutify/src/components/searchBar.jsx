import { useState } from "react";
import "./styles/searchBarStyle.css"

function SearchBar (){

    const [text, onChangeText] = useState('');

    return(
        <div className="position-absolute end-0 top-50 translate-middle-y">
            <input className="search-bar" type="text"placeholder={"Buscar"} onChange={onChangeText}/>
        </div>
    );
}

export default SearchBar

