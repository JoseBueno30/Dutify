import { useState } from "react";
import "./searchBarStyle.css";
import { BiSearch } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { useThemeContext } from "../../context/ThemeContext";

function SearchBar({isOpen}) {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [text, onChangeText] = useState("");

  return (
    <div id="section-bar" className={" top-50 translate-middle-y" + (isOpen ? "" : "occult")}>
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
