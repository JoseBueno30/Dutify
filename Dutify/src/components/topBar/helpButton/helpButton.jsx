import { GrCircleQuestion } from "react-icons/gr";
import "../iconsStyle.css";
import { useEffect, useState } from "react";

function HelpButton({ visible }) {

  return (
    <div className={"div-toogle " + (visible ? "" : "d-none")}>
      <button
        id="helpIcon"
        className="icon-style"
        data-bs-toggle="modal"
        data-bs-target="#helpModal"
        aria-expanded="false"
        aria-controls="helpModal"
        aria-haspopup="dialog"
        onClick={() => {
          document.getElementById("helpIcon").setAttribute("aria-expanded", "true");
        }}
      >
        <GrCircleQuestion size={33} title="Mostrar ayuda" />
      </button>
    </div>
  );
}

export default HelpButton;
