import { useEffect, useState } from "react";
import { getUserPlaylists } from "../../spotifyApi/SpotifyApiCalls";
import Carousel from '../carousel/carousel';

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
            <section style={{backgroundColor : '#443D3D' , height: '100%', widht : '100%'}}>
                <Carousel id="1" lista={lists} name="Listas populares:"></Carousel>
                <Carousel id="2" lista={lists} name="Artistas populares:"></Carousel>
                <Carousel id="3" lista={lists} name="Recomendaciones:"></Carousel>
            </section>
        </>
    );
}

export default Inicio;