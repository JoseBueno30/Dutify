import { useEffect, useState } from "react";
import "./searchBarStyle.css";
import { BiSearch } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { useThemeContext } from "../../../context/ThemeContext";
import { searchTracks } from "../../../spotifyApi/SpotifyApiCalls";
import SongList from "../../songList/songList";
import NavButton from "../navButton/navButton";
import ClickOutside from "./clickOutside";

function SearchBar({ isOpen }) {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [text, setText] = useState("");
  const [tracks, setTracks] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydownListener);

    return () => {
      document.removeEventListener("keydown", handleKeydownListener);
    };
  }, []);

  const handleKeydownListener = (event) => {
    if (event.key === "Enter" && document.activeElement === document.getElementById("search-bar")) {
      search();
    }
  };

  const changeVisibility = () => {
    setVisible(!visible);
  };

  function esSoloEspacios(texto) {
    return /^\s*$/.test(texto);
  }

  const onChangeText = async () => {
    const query = document.getElementById("search-bar").value;

    if (query != "") {
      const foundTracks = await searchTracks(query, 6);
      setTracks(foundTracks);
      setVisible(true);
    } else {
      setTracks([]);
      setVisible(false);
    }

    setText(query);
  };

  const search = () => {
    if(!document.getElementById("search-bar").value==="" || !esSoloEspacios(document.getElementById("search-bar").value)){
      window.location.href = "/busqueda?query=" + document.getElementById("search-bar").value;
    }
  }

  return (
    <div className={(isOpen ? "" : " occult ") + "d-flex"}>
      <input
        id="search-bar"
        className="search-bar"
        type="text"
        placeholder={"Buscar"}
        onChange={onChangeText}
      />
      <button
        className="position-absolute search-btn"
        onClick={search}
      >
        <BiSearch className="" style={{ color: "black" }} />
      </button>
      {visible ? (
        <div className={"position-absolute search-results"}>
          <ClickOutside
            onClick={changeVisibility}
            className={
              "d-flex flex-wrap  align-items-center justify-content-center"
            }
          >
            <SongList tracks={tracks}></SongList>
            <button
              onClick={search}
              className="btn btn-showMore mt-auto mb-2"
            >
              Mostrar más
            </button>
          </ClickOutside>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchBar;
