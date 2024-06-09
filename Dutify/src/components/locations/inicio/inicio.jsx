import './inicioStyle.css';
import { useEffect, useState } from "react";
import { setAccessToken,getUserPlaylists, getPopularPlaylists, getPopularArtistsPlaylists, getRecommendedPlaylists, getAccessToken } from "../../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../../cardsGrid/cardsGrid";
import Spinner from '../../spinner/spinner';
import CarouselComponent from '../../carousel/carousel';

function Inicio({token}){
    
    const [recent_playlists, setRecentPlaylists] = useState([]);
    const [popular_playlists, setPopularPlaylists] = useState([]);
    const [popular_artists_playlists, setPopularArtistsPlaylists] = useState([]);
    const [recommended_playlists, setRecommendedPlaylists] = useState([])
    const [loading, setLoading] = useState(true);


    const cargarPlaylists = async () =>{
        
        setLoading(true);
        const user_playlists = await getUserPlaylists(token)
        setRecentPlaylists(user_playlists.slice(0,6)) // PENDIENTE DE CAMBIO*/
        setPopularPlaylists(await getPopularPlaylists(token))
        setRecommendedPlaylists(await getRecommendedPlaylists(token))
        setPopularArtistsPlaylists(await getPopularArtistsPlaylists(token))
    }

    useEffect(() => {
        document.title = "Inicio | Dutify";

        let spotifyToken = window.sessionStorage.getItem("token");

        if (!spotifyToken || spotifyToken === "undefined") {
          spotifyToken = getTokenFromUrl().access_token;
          window.sessionStorage.setItem("token", spotifyToken);
        }

        setAccessToken(spotifyToken);

        cargarPlaylists().finally(() => setLoading(false));
    }, []);

    const getTokenFromUrl = () => {
        let location = window.location; 
        return location.hash
          .substring(1)
          .split("&")
          .reduce((initial, item) => {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
          }, {});
      };

    const listButtonClickHandler = (e) => {
        const key = e.currentTarget.id;
        window.location.href = "/Dutify/listas/playlist?playlistId=" + key;
    };
    
    return (
        <section className='inicio-section' aria-busy={loading}>
            {loading ? 
            <Spinner></Spinner> : 
            <><div className='div-recent-lists' id="listas-recientes">
                <h2 className='h5-recent-lists' tabIndex="0" aria-labelledby="listas-recientes">Listas recientes:</h2>
                <CardsGrid type="genrelists" data={recent_playlists} clickFunction={listButtonClickHandler} />
            </div>
            <CarouselComponent id="listas-populares" lista={popular_playlists} name="Listas populares:"></CarouselComponent>
            <CarouselComponent id="tus-artistas-favoritos" lista={popular_artists_playlists} name="Tus artistas favoritos:"></CarouselComponent>
            <CarouselComponent id="recomendaciones" lista={recommended_playlists} name="Recomendaciones:"></CarouselComponent>
            </>
            }
        </section>
    );
}

export default Inicio;