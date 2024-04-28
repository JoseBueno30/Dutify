import "./navButtonStyle.css"

function NavButton(props) {
    return (
        <a className="navButton fs-5" id={props.id}>
            {props.texto}
        </a>
    )
}

export default NavButton