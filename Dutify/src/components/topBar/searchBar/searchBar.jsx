import { useState } from "react";
import "./searchBarStyle.css";
import { BiSearch } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { useThemeContext } from "../../../context/ThemeContext";

function SearchBar({ isOpen }) {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [text, onChangeText] = useState("");

  return (
    <div className={(isOpen ? "" : " occult ") + "d-flex"}>
      <input
        id="search-bar"
        className="search-bar"
        type="text"
        placeholder={"Buscar"}
        onChange={onChangeText}
      />
      <button className="position-absolute search-btn">
        <BiSearch className="" style={{ color: "black" }} />
      </button>
    </div>
  );
}

export default SearchBar;
