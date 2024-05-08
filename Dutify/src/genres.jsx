import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import CardsGrid from "./components/cardsGrid/cardsGrid";

const spotifyApi = new SpotifyWebApi();

function Genres({ token }) {
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    console.log("hola")
    spotifyApi.setAccessToken(token);

    spotifyApi
      .getAvailableGenreSeeds()
      .then((data) => {
        console.log(data.genres)
        setGenres(data.genres);
      })
      .catch((error) => {
        console.error("Error al obtener los generos: ", error);
      });
  }, []);

  return <CardsGrid type="genre" data={genres}></CardsGrid>;
}

export default Genres;
