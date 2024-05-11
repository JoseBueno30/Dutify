import { useEffect, useState } from "react";
import { getUserPlaylists } from "../../spotifyApi/SpotifyApiCalls";
import Carousel from '../carousel/carousel';
import CardsGrid from "../cardsGrid/cardsGrid";

function Inicio({token}){
    
    // PRUEBA
    const [lists, setLists] = useState([]);

    const cargarPlaylists = async () =>{
        console.log( await getUserPlaylists(token))
        setLists(await getUserPlaylists(token))
    }

    useEffect(() => {
        cargarPlaylists();
    }, []);
    
    return (
        <>
            <section style={{backgroundColor : 'var(--color-backgroud)' 
                            , height: '100%'
                            , width : '100%'
                            , display: 'flex'
                            , flexDirection: 'column'
                            , gap: '30px'
                            }}>
                <div>
                    <h5 style={{textDecoration: 'underline',color: 'var(--color-text)'}}>Listas recientes</h5>
                    <CardsGrid type="recentLists" data={lists}></CardsGrid>
                </div>
                <Carousel id="carrusel-1" lista={lists} name="Listas populares:"></Carousel>
                <Carousel id="carrusel-2" lista={lists} name="Artistas populares:"></Carousel>
                <Carousel id="carrusel-3" lista={lists} name="Recomendaciones:"></Carousel>
            </section>
        </>
    );
}

export default Inicio;