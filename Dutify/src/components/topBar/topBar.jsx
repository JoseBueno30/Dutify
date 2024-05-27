import { BiArrowBack } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import NavButton from "./navButton/navButton";
import SearchBar from "./searchBar/searchBar";
import ThemeSwitch from "./themeSwitch/themeSwitch";
import HelpButton from "./helpButton/helpButton";
import { useThemeContext } from "../../context/ThemeContext";
import { BsList } from "react-icons/bs";
import "./topBarStyle.css";
import { useState } from "react";

function TopBar() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const toggleNavMenu = () => {
    setNavMenuOpen(!navMenuOpen);
    showHideIcons();
  };

  const toggleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen);
    const input = document.getElementById("search-bar");
    input.value = "";
    showHideIcons();
  };

  const showHideIcons = () => {
    const themeToggler = document.getElementById("themeToggle");
    themeToggler.classList.contains("d-none")
      ? themeToggler.classList.remove("d-none")
      : themeToggler.classList.add("d-none");
  };

  const navMenuIcon = () => {
    
    const propiedades= {
      "id": "botonNav",
      "title": "Menu de navegación",
      "aria-expanded": navMenuOpen ? "true" : "false",
      "aria-controls": "NavMobileMenu",
    }

    if (navMenuOpen) {
      return contextTheme === "light" ? (
        <BsX size={35} color="black" title="Cerrar dropdown" {...propiedades}></BsX>
      ) : (
        <BsX size={35} color="white" title="Cerrar dropdown" {...propiedades}></BsX>
      );
    } else if (searchBarOpen) {
      return <BsX size={35} color="black" title="Cerrar buscador" {...propiedades}></BsX>;
    } else {
      return contextTheme === "light" ? (
        <BsList size={35} color="black" title="Cerrar buscador" {...propiedades}></BsList>
      ) : (
        <BsList size={35} color="white" title="Cerrar buscador" {...propiedades}></BsList>
      );
    }
  };

  return (
    <header className="fixed-top topBar ps-2 pe-2 " id={contextTheme}>
      <div
        className={
          (navMenuOpen ? "flex-wrap" : "") +
          " d-flex position-relative h-100 align-items-center"
        }
      >
        <h1
          className={"title mt-2 pb-1 " + (searchBarOpen ? "d-none" : "")}
          id={contextTheme}
        >
          DutiFy
        </h1>
        <nav className={"navMenu me-auto"} id={contextTheme}>
          <NavButton location={1} texto="Inicio" id={contextTheme}></NavButton>
          <NavButton location={2} texto="Generos" id={contextTheme}></NavButton>
          <NavButton location={3} texto="Listas" id={contextTheme}></NavButton>
        </nav>
        <div className="d-flex justify-content-between align-items-center">
          <HelpButton visible={!searchBarOpen && !navMenuOpen} />
          <ThemeSwitch visible={!searchBarOpen && !navMenuOpen}></ThemeSwitch>
          <SearchBar isOpen={searchBarOpen} ></SearchBar>

          <button
            id="searchButton"
            className={
              "mobile-btn list-group-item icon-style div-toogle" +
              (navMenuOpen || searchBarOpen ? " d-none" : "")
            }
            onClick={toggleSearchBar}
          >
            <BiSearch size={35} title="Buscar canción"/>
          </button>
          <button
            className={
              "mobile-btn list-group-item " +
              (searchBarOpen ? "position-absolute start-0 ms-1" : "")
            }
            onClick={searchBarOpen ? toggleSearchBar : toggleNavMenu}
          >
            {navMenuIcon()}
          </button>
        </div>

        <nav
          className={(navMenuOpen ? "open " : "closed ") + "navMenuMobile"}
          id={contextTheme + " NavMobileMenu"}
          aria-hidden={navMenuOpen ? "false" : "true"}
          aria-labelledby="botonNav"
          role="menu"
        >
          <NavButton texto="Inicio" id={contextTheme}></NavButton>
          <NavButton texto="Generos" id={contextTheme}></NavButton>
          <NavButton texto="Listas" id={contextTheme}></NavButton>
        </nav>
      </div>
    </header>
  );
}

export default TopBar;
