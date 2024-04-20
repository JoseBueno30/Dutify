import "./styles/navButtonStyle.css"

function NavButton(props) {
    return (
        <a className="navButton fs-5">
            <span></span><span></span><span></span><span></span><span></span>
            {props.texto}
        </a>
    )
}

export default NavButton