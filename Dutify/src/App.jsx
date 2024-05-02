import SongList from './components/songList/songList'
import TopBar from './components/topBar/topBar'
import { useThemeContext } from "./context/ThemeContext";
import "./App.css";
import PlayList from './components/playList/playList';

function App() {

  const {contextTheme, setContextTheme} = useThemeContext()

  return (
    <div id={contextTheme}>
      <TopBar/>
      <PlayList/>
    </div>
  )
}

export default App
