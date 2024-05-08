import { useLocationContext } from "../../../context/LocationContext"
import "./navButtonStyle.css"

function NavButton(props) {
    const {location, setLocation} = useLocationContext();


    return (
        <a  onClick={() => setLocation(props.location)} 
            className={"navButton fs-5" + (props.location == location ? " currentLocation" : "")}
            id={props.id}>
            {props.texto}
        </a>
    )
}

export default NavButton