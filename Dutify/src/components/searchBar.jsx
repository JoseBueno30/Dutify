import "./styles/searchBarStyle.css"

function SearchBar (){
    return(
        <div className="position-absolute end-0 top-50 translate-middle-y">
            <input className="search-bar" type="text"placeholder={"Buscar"}/>
        </div>
    );
}

export default SearchBar

