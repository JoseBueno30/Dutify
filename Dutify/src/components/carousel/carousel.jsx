import React, { useState, useContext } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carouselStyle.css';
import { PageHandlerContext } from "../../App";

const CarouselComponent = ({ lista, name, id }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const setPage = useContext(PageHandlerContext).setPage;
  const setPlaylistId = useContext(PageHandlerContext).setPlaylistId;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: '0',
    swipeToSlide: true, // Permite que el carrusel avance varios elementos al deslizarlo según la fuerza que se emplee
    touchThreshold: 20, // Sensibilidad al deslizar el carrusel
    beforeChange: (oldIndex, newIndex) => handleChange(newIndex),
  };

  const ClickHandler = (id) => {
    setPlaylistId(id);
    setPage("playlist");
  };

  const handleKeyUp = (event, id) => {
    if (event.key === 'Enter') {
      ClickHandler(id);
    }
  };

  const handleChange = (index) => {
    setActiveIndex(index);
    // Anunciar el nombre de la playlist cuando cambia
    const activePlaylist = lista[index];
    if (activePlaylist) {
      const announcement = document.getElementById(`playlist-announce-${id}`);
      if (announcement) {
        announcement.textContent = `Playlist actual: ${activePlaylist.description}`;
      }
    }
  };

  return (
    <section className='carrusel-container' aria-label={name} id={id}>
      <div className='carrusel-box'>
        <h2 className='carrusel-h5' tabIndex="0" aria-labelledby={id}>{name}</h2>
        <div className="carousel-container">
          <Slider {...settings}>
            {lista.map((playlist, index) => (
              <div
                key={playlist.id}
                className="carousel__item"
                onClick={() => ClickHandler(playlist.id)}
                aria-label={playlist.description}
                aria-live={index === activeIndex ? "assertive" : "off"}
              >
                {index === activeIndex ?
                  <button onKeyUp={(event) => index === activeIndex && handleKeyUp(event, playlist.id)}>
                    <img src={playlist.imageUrl} alt={playlist.description} />
                  </button>
                :
                <img src={playlist.imageUrl} alt={playlist.description} />
                }
              </div>
            ))}
          </Slider>
        </div>
        <input type='hidden' id={`playlist-announce-${id}`} className="sr-only" aria-live="assertive" />
        <div className='carrusel-dot-section' />
      </div>
    </section>
  );
};

export default CarouselComponent;
