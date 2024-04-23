import { useState } from "react";
import "./themeSwitchStyle.css";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";

function ThemeSwitch() {
  const [theme, setTheme] = useState("dark");

  const switchTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <button
      className="theme-toogle position-absolute top-50 translate-middle-y"
      onClick={switchTheme}
    >
      {theme === "dark" ? (
        <BiSun size={30} color="white"></BiSun>
      ) : (
        <BiMoon size={30} color="black"></BiMoon>
      )}
    </button>
  );
}

export default ThemeSwitch;
