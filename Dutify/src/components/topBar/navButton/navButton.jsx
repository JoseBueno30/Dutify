import { PageHandlerContext } from "../../../App";
import "./navButtonStyle.css"
import { useContext } from "react";

function NavButton(props) {

    const setPage = useContext(PageHandlerContext).setPage;
    const page = window.sessionStorage.getItem("page");

    const activeLocation = page!==undefined?(page ==="/"+props.texto.toLowerCase()):false;

    const setLocation = () => {
        setPage("/" + props.texto.toLowerCase());
    }
    return (
        <button  onClick={setLocation} 
            className={"navButton fs-5" + ( activeLocation? " currentLocation" : "")}
            id={props.id}
            title={"Ir a " + props.texto}
            aria-current={activeLocation ? "page" : ""}>
            {props.texto}
        </button>
    )
}

export default NavButton