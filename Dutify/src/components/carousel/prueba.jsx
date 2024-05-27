import React, { useState } from 'react'; // Importa useState desde React
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './CarouselComponent.css';

const CarouselComponent = ({ lista, name, id }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Define el estado activeIndex

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
    beforeChange: (oldIndex, newIndex) => handleChange(newIndex) // Agrega un evento beforeChange para actualizar el activeIndex
  };

  const ClickHandler = (id) => {
    window.location.href = "/listas/playlist?playlistId=" + id;
  }
  
  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter') {
      ClickHandler(id);
    }
  };

  const handleChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className='carrusel-container' aria-label={name} id={id}>
      <div className='carrusel-box'>
        <h5 className='carrusel-h5' tabIndex="0" aria-labelledby={id}>{name}</h5>
        <div className="carousel-container">
          <Slider {...settings}>
            {lista.map((playlist, index) => (
              <div
                key={playlist.id}
                className="carousel__item"
                tabIndex={index === activeIndex ? "0" : "-1"}
                role={index === activeIndex ? "button" : undefined}
                onClick={index === activeIndex ? () => ClickHandler(playlist.id) : undefined}
                onKeyDown={index === activeIndex ? (event) => handleKeyDown(event, playlist.id) : undefined}
                aria-label={playlist.description}
              >
                <img src={playlist.imageUrl} alt={playlist.description} />
              </div>
            ))}
          </Slider>
        </div>
        <div className='carrusel-dot-section' />
      </div>   
    </section>
  );
};

export default CarouselComponent;
