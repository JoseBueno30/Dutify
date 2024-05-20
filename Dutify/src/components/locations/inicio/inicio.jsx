import './inicio.css';
import { useEffect, useState } from "react";
import { getUserPlaylists, getPopularPlaylists, getPopularArtistsPlaylists, getRecommendedPlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import Carousel from '../../carousel/carousel';
import CardsGrid from "../../cardsGrid/cardsGrid";

function Inicio({token}){
    
    const [recent_playlists, setRecentPlaylists] = useState([]);
    const [popular_playlists, setPopularPlaylists] = useState([]);
    const [popular_artists_playlists, setPopularArtistsPlaylists] = useState([]);
    const [recommended_playlists, setRecommendedPlaylists] = useState([])


    const cargarPlaylists = async () =>{
        const user_playlists = await getUserPlaylists(token)
        setRecentPlaylists(user_playlists.slice(0,6)) // PENDIENTE DE CAMBIO
        setPopularPlaylists(await getPopularPlaylists(token))
        setRecommendedPlaylists(await getRecommendedPlaylists(token))
        setPopularArtistsPlaylists(await getPopularArtistsPlaylists(token))
    }

    useEffect(() => {
        cargarPlaylists();
    }, []);

    const listButtonClickHandler = (e) => {
        const key = e.currentTarget.id;
        window.location.href = "listas/playlist?playlistId=" + key;
    };
    
    return (
        <section className='inicio-section'>
            <div className='div-recent-lists'>
                <h5 className='h5-recent-lists'>Listas recientes:</h5>
                <CardsGrid type="genrelists" data={recent_playlists} clickFunction={listButtonClickHandler} />
            </div>
            <Carousel id="carrusel-1" lista={popular_playlists} name="Listas populares:"></Carousel>
            <Carousel id="carrusel-2" lista={popular_artists_playlists} name="Tus artistas favoritos:"></Carousel>
            <Carousel id="carrusel-3" lista={recommended_playlists} name="Recomendaciones:"></Carousel>
        </section>
    );
}

export default Inicio;