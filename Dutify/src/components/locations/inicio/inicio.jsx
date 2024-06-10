import './inicioStyle.css';
import { useEffect, useState, useContext } from "react";
import { setAccessToken,getUserPlaylists, getPopularPlaylists, getPopularArtistsPlaylists, getRecommendedPlaylists, getAccessToken } from "../../../spotifyApi/SpotifyApiCalls";
import CardsGrid from "../../cardsGrid/cardsGrid";
import Spinner from '../../spinner/spinner';
import CarouselComponent from '../../carousel/carousel';
import { PageHandlerContext } from '../../../App';

function Inicio(){
    
    const [recent_playlists, setRecentPlaylists] = useState([]);
    const [popular_playlists, setPopularPlaylists] = useState([]);
    const [popular_artists_playlists, setPopularArtistsPlaylists] = useState([]);
    const [recommended_playlists, setRecommendedPlaylists] = useState([])
    const [loading, setLoading] = useState(false);

    const setPage = useContext(PageHandlerContext).setPage;
    const setPlaylistId = useContext(PageHandlerContext).setPlaylistId;


    const cargarPlaylists = async () =>{
        
        setLoading(true);
        const user_playlists = await getUserPlaylists()
        setRecentPlaylists(user_playlists.slice(0,6)) // PENDIENTE DE CAMBIO*/
        setPopularPlaylists(await getPopularPlaylists())
        setRecommendedPlaylists(await getRecommendedPlaylists())
        setPopularArtistsPlaylists(await getPopularArtistsPlaylists())
    }

    useEffect(() => {
        document.title = "Inicio | Dutify";

        cargarPlaylists().finally(() => setLoading(false));
    }, []);

    

    const listButtonClickHandler = (e) => {
        const key = e.currentTarget.id;
        setPlaylistId(key);
        setPage("playlist");
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