import { BiArrowBack } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import NavButton from "./navButton/navButton";
import SearchBar from "./searchBar/searchBar";
import ThemeSwitch from "./themeSwitch/themeSwitch";
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
    if (navMenuOpen) {
      return contextTheme === "light" ? (
        <BsX size={35} color="black"></BsX>
      ) : (
        <BsX size={35} color="white"></BsX>
      );
    } else if (searchBarOpen) {
      return <BsX size={35} color="black"></BsX>;
    } else {
      return contextTheme === "light" ? (
        <BsList size={35} color="black"></BsList>
      ) : (
        <BsList size={35} color="white"></BsList>
      );
    }
  };

  return (
    <header
      style={
        contextTheme === "light"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#4E4848" }
      }
      className="position-relative topBar ps-2 pe-2 "
      id={contextTheme}
    >
      <div className={(navMenuOpen ? "flex-wrap" : "") + " d-flex position-relative container-fluid mh-100 "}>
        <button className="pt-1 m-2 btn btn-back btn-secondary" type="button">
          {contextTheme === "light" ? (
            <BiArrowBack color="black"></BiArrowBack>
          ) : (
            <BiArrowBack color="white"></BiArrowBack>
          )}
        </button>
        <h1 className={"title mt-2 " + (searchBarOpen ? "d-none" : "")} id={contextTheme}>
          DutyFy
        </h1>
        <nav className={"navMenu me-auto"} id={contextTheme}>
          <NavButton texto="Inicio" id={contextTheme}></NavButton>
          <NavButton texto="Generos" id={contextTheme}></NavButton>
          <NavButton texto="Listas" id={contextTheme}></NavButton>
        </nav>
        <div className="d-flex justify-content-between align-items-center">
          <ThemeSwitch visible={!searchBarOpen && !navMenuOpen}></ThemeSwitch>
          <SearchBar isOpen={searchBarOpen}></SearchBar>

          <button
            id="searchButton"
            className={
              "mobile-btn list-group-item" +
              (navMenuOpen || searchBarOpen ? " d-none" : "")
            }
            onClick={toggleSearchBar}
          >
            {contextTheme === "light" ? (
              <BiSearch size={35} color="black"></BiSearch>
            ) : (
              <BiSearch size={35} color="white"></BiSearch>
            )}
          </button>
          <button
            className={
              "mobile-btn list-group-item " + (searchBarOpen ? "position-absolute start-0 ms-1" : "")
            }
            onClick={searchBarOpen ? toggleSearchBar : toggleNavMenu}
          >
            {navMenuIcon()}
          </button>
        </div>

        <nav
          className={(navMenuOpen ? "open " : "closed ") + "navMenuMobile"}
          id={contextTheme}
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
