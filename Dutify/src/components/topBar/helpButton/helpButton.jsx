import { GrCircleQuestion } from "react-icons/gr";
import "../iconsStyle.css";

function HelpButton({ visible }) {
  return (
    <div
      style={{ aspectRatio: "1/1", height: "80%" }}
      className={"div-toogle " + (visible ? "" : "d-none")}
    >
      <button
        id="helpIcon"
        className="icon-style"
        data-bs-toggle="modal"
        data-bs-target="#helpModal"
      > 
        <GrCircleQuestion size={33} title="Mostrar ayuda" />
      </button>
    </div>
  );
}

export default HelpButton;
