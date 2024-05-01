import { BiArrowBack } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import NavButton from "../navButton/navButton";
import SearchBar from "../searchBar/searchBar";
import ThemeSwitch from "../themeSwitch/themeSwitch";
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
    } else if(searchBarOpen){
      return <BsX size={35} color="black"></BsX>
    } 
    else {
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
      className="position-relative topBar ps-2 pe-2"
      id={contextTheme}
    >
      <div className="position-relative top-50 translate-middle-y mh-100 d-flex">
        <button className="pt-1 m-2 btn btn-back btn-secondary" type="button">
          {contextTheme === "light" ? (
            <BiArrowBack color="black"></BiArrowBack>
          ) : (
            <BiArrowBack color="white"></BiArrowBack>
          )}
        </button>
        <h1 className="title mt-2" id={contextTheme}>
          DutyFy
        </h1>
        <nav
          className={(navMenuOpen ? "open " : "closed ") + "navMenu"}
          id={contextTheme}
        >
          <NavButton texto="Inicio" id={contextTheme}></NavButton>
          <NavButton texto="Generos" id={contextTheme}></NavButton>
          <NavButton texto="Listas" id={contextTheme}></NavButton>
        </nav>
        <ThemeSwitch></ThemeSwitch>
        <SearchBar isOpen={searchBarOpen}></SearchBar>
        <button
          id="searchButton"
          className={"position-absolute top-50 translate-middle-y mobile-btn list-group-item" + (navMenuOpen || searchBarOpen ? " d-none" : "")}
          style={{ left: "76%" }}
          onClick={toggleSearchBar}
        >
          {contextTheme === "light" ? (
            <BiSearch size={35} color="black"></BiSearch>
          ) : (
            <BiSearch size={35} color="white"></BiSearch>
          )}
        </button>
        <button
          className={"position-absolute top-50 translate-middle-y mobile-btn list-group-item " + (searchBarOpen ? " start-0" : "")}
          style={{ left: "90%" }}
          onClick={searchBarOpen ? toggleSearchBar : toggleNavMenu}
        >
          {navMenuIcon()}
        </button>
      </div>
    </header>
  );
}

export default TopBar;
