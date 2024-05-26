import "./navButtonStyle.css"

function NavButton(props) {

    const setLocation = () => {
        window.location.href = "/" + props.texto.toLowerCase();
    }
    return (
        <button  onClick={setLocation} 
            className={"navButton fs-5" + (window.location.href.split("/")[3].includes(props.texto.toLowerCase()) ? " currentLocation" : "")}
            id={props.id}>
            {props.texto}
        </button>
    )
}

export default NavButton