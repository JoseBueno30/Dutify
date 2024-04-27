import { BiArrowBack } from "react-icons/bi";
import NavButton from "../navButton/navButton";
import SearchBar from "../searchBar/searchBar";
import ThemeSwitch from "../themeSwitch/themeSwitch";
import { useThemeContext } from "../../context/ThemeContext";
import "./topBarStyle.css"

function TopBar() {
  const { contextTheme, setContextTheme } = useThemeContext();

  return (
    <header
    style={
      contextTheme === "light"
        ? { backgroundColor: "white" }
        : { backgroundColor: "#4E4848" }
    }
      className="position-relative topBar ps-2 pe-2"
      id={contextTheme}
    >
      <div className="position-relative mh-100 d-flex">
        <button className="pt-1 m-2 btn btn-back btn-secondary" type="button">
          {contextTheme === 'light'?
            <BiArrowBack color="black"></BiArrowBack> : 
            <BiArrowBack color="white"></BiArrowBack>}
        </button>
        <h1
          className="float-start fs-3 mt-2"
          style={{ color: "#655BE6" }}
          id={contextTheme}
        >
          DutyFy
        </h1>
        <nav>
          <NavButton texto="Inicio" id={contextTheme}></NavButton>
          <NavButton texto="Generos" id={contextTheme}></NavButton>
          <NavButton texto="Listas" id={contextTheme}></NavButton>
        </nav>
        <ThemeSwitch></ThemeSwitch>
        <SearchBar></SearchBar>
      </div>
    </header>
  );
}

export default TopBar;
