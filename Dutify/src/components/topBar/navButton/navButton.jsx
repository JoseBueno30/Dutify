import "./navButtonStyle.css"

function NavButton(props) {

    const activeLocation = window.location.href.split("/")[4].toLowerCase().includes(props.texto.toLowerCase());

    const setLocation = () => {
        window.location.href = "/Dutify/" + props.texto.toLowerCase();
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