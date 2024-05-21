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

  const changeVisibility = () => {
    setVisible(!visible);
  }

  const onChangeText = async () => {
    const query = document.getElementById("search-bar").value;
    
    if (query != "") {
      const foundTracks = await searchTracks(query,6);
      setTracks(foundTracks);
      setVisible(true);
    } else {
      setTracks([]);
      setVisible(false);
    }

    setText(query);
  };

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
      {visible ? (
        <div className={"position-absolute search-results"}>
          <ClickOutside onClick={changeVisibility} className={"d-flex flex-wrap  align-items-center justify-content-center"}>
            <SongList tracks={tracks}></SongList>
            <button onClick={() => window.location.href="/busqueda?query="+text} className="btn btn-showMore mt-auto mb-2">Mostrar más</button>
          </ClickOutside>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchBar;
