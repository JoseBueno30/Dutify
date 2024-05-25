import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carouselStyle.css';

const CustomCarousel = ({ lista, name }) => {

    const ClickHandler = (id) => {
        window.location.href = "/listas/playlist?playlistId=" + id;
    }

  return (
    <section className='carrusel-container'>
        <div className='carrusel-box'>
            <h5 className='carrusel-h5'>{name}</h5>
            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={5000}
                transitionTime={500}
                centerMode
                centerSlidePercentage={35}
                >
                {lista.map((playlist) => (
                    <div key={playlist.id} className="carousel__item" onClick={()=>{ClickHandler(playlist.id)}}>
                        <img src={playlist.imageUrl} alt={playlist.description} />
                    </div>
                ))}
            </Carousel>
        </div>
    </section>
    
  );
};

export default CustomCarousel;
