import { BiArrowBack } from "react-icons/bi";
import NavButton from "./navButton/navButton";
import SearchBar from "./searchBar/searchBar";
import ThemeSwitch from "./themeSwitch/themeSwitch";

function TopBar() {
  return (
    <header className="position-relative topBar ps-2 pe-2">
      <div className="position-relative mh-100 d-flex">
        <button className="pt-1 m-2 btn btn-secondary" type="button">
          <BiArrowBack />
        </button>
        <h1 className="float-start fs-3 mt-2" style={{ color: "#655BE6" }}>
          DutyFy
        </h1>
        <nav>
          <NavButton texto="Inicio"></NavButton>
          <NavButton texto="Generos"></NavButton>
          <NavButton texto="Listas"></NavButton>
        </nav>
        <ThemeSwitch></ThemeSwitch>
        <SearchBar></SearchBar>
      </div>
    </header>
  );
}

export default TopBar;
