import { useState } from "react";
import "./searchBarStyle.css";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  const [text, onChangeText] = useState("");

  return (
    <div className="position-absolute end-0 top-50 translate-middle-y">
      <button className="position-absolute search-btn">
        <BiSearch className="" style={{ color: "black" }} />
      </button>
      <input
        className="search-bar"
        type="text"
        placeholder={"Buscar"}
        onChange={onChangeText}
      />
    </div>
  );
}

export default SearchBar;
