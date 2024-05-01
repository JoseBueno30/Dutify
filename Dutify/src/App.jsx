import TopBar from "./components/topBar/topBar";
import "./index.css";
import ListCard from "./components/listCard/listCard";
import GenreCard from "./components/genreCard/genreCard";

function App() {
  return (
    <>
      <TopBar></TopBar>
      <div className="d-flex">
        <GenreCard genreName="Pop" background="pop" />
        <GenreCard genreName="Rock" background="rock" />
        <GenreCard genreName="Hip-Hop" background="hip-hop" />
      </div>
      <div className="d-flex">
        <GenreCard genreName="Jazz" background="jazz" />
        <GenreCard genreName="Reggaeton" background="reggaeton" />
        <GenreCard genreName="Flamenco" background="flamenco" />
      </div>
      <div className="d-flex">
        <GenreCard genreName="Techno" background="techno" />
        <GenreCard genreName="Metal" background="metal" />
        <GenreCard genreName="K-Pop" background="k-pop" />
      </div>
      <div className="d-flex">
        <GenreCard genreName="Soul" background="soul" />
        <GenreCard genreName="Clásica" background="clasica" />
        <GenreCard genreName="Videojuegos" background="videojuegos" />
      </div>
      <div className="d-flex">
        <GenreCard genreName="Anime" background="anime" />
        <GenreCard genreName="Trap" background="trap" />
        <GenreCard genreName="Latino" background="latino" />
      </div>
    </>
  );
}

export default App;
