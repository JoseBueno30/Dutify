import "./themeSwitchStyle.css";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import { useThemeContext } from "../../../context/ThemeContext";

function ThemeSwitch({visible}) {
  const { contextTheme, setContextTheme } = useThemeContext();

  const switchTheme = () => {
    setContextTheme((state) => (state === "light" ? "dark" : "light"));
  };

  return (
    <div style={{width: "35px", height:"35px"}} className={"div-toogle " +( visible ? "" : "d-none")}>
      <button
        id="themeToggle"
        className="theme-toggle position-absolute top-50 translate-middle-y pb-2"
        onClick={switchTheme}
      >
        {contextTheme === "dark" ? (
          <BiSun size={35} title="Cambiar tema" color="white"></BiSun>
        ) : (
          <BiMoon size={35} title="Cambiar tema" color="black"></BiMoon>
        )}
      </button>
    </div>
  );
}

export default ThemeSwitch;
