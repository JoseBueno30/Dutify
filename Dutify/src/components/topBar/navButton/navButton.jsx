import "./navButtonStyle.css"

function NavButton(props) {

    return (
        <a  onClick={() => setLocation(props.location)} 
            className={"navButton fs-5" + (window.location.href.includes(props.texto) ? " currentLocation" : "")}
            id={props.id}
            href={"/" + props.texto}>
            {props.texto}
        </a>
    )
}

export default NavButton