import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import { useThemeContext } from "../../../context/ThemeContext";
import '../iconsStyle.css';

function ThemeSwitch({visible}) {
  const { contextTheme, setContextTheme } = useThemeContext();

  const switchTheme = () => {
    setContextTheme((state) => (state === "light" ? "dark" : "light"));
  };

  return (
    <div style={{aspectRatio: "1/1", height:"80%" }} className={"div-toogle " +( visible ? "" : "d-none")}>
      <button
        id="themeToggle"
        className="icon-style"
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
