import { BiArrowBack } from "react-icons/bi";
import NavButton from "./navButton";
import SearchBar from "./searchBar";

function TopBar() {
  return (
    <div className="position-relative topBar p-2">
      <div className="position-relative top-50 start-0 translate-middle-y float">
        <button
          className="float-start pt-1 me-2 btn btn-secondary"
          type="button"
        >
          <BiArrowBack />
        </button>
        <h1 className="float-start fs-3" style={{ color: "#655BE6" }}>
          DutyFy
        </h1>
        <NavButton texto="Inicio"></NavButton>
        <NavButton texto="Generos"></NavButton>
        <NavButton texto="Listas"></NavButton>

        <SearchBar></SearchBar>
      </div>
    </div>
  );
}

export default TopBar;
