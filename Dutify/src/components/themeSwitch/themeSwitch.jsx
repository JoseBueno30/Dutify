import "./themeSwitchStyle.css";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import { useThemeContext } from "../../context/ThemeContext";


function ThemeSwitch() {
  const {contextTheme, setContextTheme} = useThemeContext()

  const switchTheme = () => {
    setContextTheme((state) => (state === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      className="theme-toogle position-absolute top-50 translate-middle-y"
      onClick={switchTheme}
    >
      {contextTheme === "dark" ? (
        <BiSun size={30} color="white"></BiSun>
      ) : (
        <BiMoon size={30} color="black"></BiMoon>
      )}
    </button>
  );
}

export default ThemeSwitch;
