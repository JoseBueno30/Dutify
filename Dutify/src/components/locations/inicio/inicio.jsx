import './inicioStyle.css';
import { useEffect, useState } from "react";
import { getUserPlaylists, getPopularPlaylists, getPopularArtistsPlaylists, getRecommendedPlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../../cardsGrid/cardsGrid";
import Spinner from '../../spinner/spinner';
import CustomCarousel from '../../carousel/carousel';
import CarouselComponent from '../../carousel/prueba';

function Inicio({token}){
    
    const [recent_playlists, setRecentPlaylists] = useState([]);
    const [popular_playlists, setPopularPlaylists] = useState([]);
    const [popular_artists_playlists, setPopularArtistsPlaylists] = useState([]);
    const [recommended_playlists, setRecommendedPlaylists] = useState([])
    const [loading, setLoading] = useState(false);


    const cargarPlaylists = async () =>{
        
        setLoading(true);
        const user_playlists = await getUserPlaylists(token)
        setRecentPlaylists(user_playlists.slice(0,6)) // PENDIENTE DE CAMBIO
        setPopularPlaylists(await getPopularPlaylists(token))
        setRecommendedPlaylists(await getRecommendedPlaylists(token))
        setPopularArtistsPlaylists(await getPopularArtistsPlaylists(token))
    }

    useEffect(() => {
        cargarPlaylists().finally(() => setLoading(false));
    }, []);

    const listButtonClickHandler = (e) => {
        const key = e.currentTarget.id;
        window.location.href = "listas/playlist?playlistId=" + key;
    };
    
    return (
        <section className='inicio-section'>
            {loading ? 
            <Spinner></Spinner> : 
            <><div className='div-recent-lists' id="Listas recientes">
                <h5 className='h5-recent-lists' tabIndex="0" aria-labelledby="Listas recientes">Listas recientes:</h5>
                <CardsGrid type="genrelists" data={recent_playlists} clickFunction={listButtonClickHandler} />
            </div>
            {/*<CustomCarousel id="Listas populares" lista={popular_playlists} name="Listas populares:"></CustomCarousel>
            <CustomCarousel id="Tus artistas favoritos" lista={popular_artists_playlists} name="Tus artistas favoritos:"></CustomCarousel>
            <CustomCarousel id="Recomendaciones" lista={recommended_playlists} name="Recomendaciones:"></CustomCarousel>
            */}
            
            <CarouselComponent id="Recomendaciones" lista={recommended_playlists} name="Recomendaciones:"></CarouselComponent>
            </>
            }
        </section>
    );
}

export default Inicio;