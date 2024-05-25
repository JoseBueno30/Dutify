import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carouselStyle.css';
import left_arrow from './left_arrow.svg';
import right_arrow from './right_arrow.svg';

const CustomCarousel = ({ lista, name, id }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const ClickHandler = (id) => {
        window.location.href = "/listas/playlist?playlistId=" + id;
    }

    // Flecha personalizada
    const CustomArrow = ({ onClick, direction }) => (
        <button className={`custom-arrow custom-arrow-${direction}`} onClick={onClick} aria-label={direction === 'left' ? 'Previous' : 'Next'}>
            {direction === 'left' ? <img src={left_arrow} alt="Previous"/> : <img src={right_arrow} alt="Next"/>}
        </button>
    );

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
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay
                    interval={5000}
                    transitionTime={500}
                    centerMode
                    centerSlidePercentage={35}
                    selectedItem={activeIndex}
                    onChange={handleChange}
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && <CustomArrow onClick={onClickHandler} direction="left" />
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        hasNext && <CustomArrow onClick={onClickHandler} direction="right" />
                    }
                >
                    {lista.map((playlist, index) => (
                        <div
                            key={playlist.id}
                            className="carousel__item"
                            tabIndex={index === activeIndex ? "0" : "-1"}
                            role={index === activeIndex ? "button" : undefined}
                            onClick={index === activeIndex ? () => { ClickHandler(playlist.id) } : undefined}
                            onKeyDown={index === activeIndex ? (event) => handleKeyDown(event, playlist.id) : undefined}
                            aria-label={playlist.description}
                        >
                            <img src={playlist.imageUrl} alt={playlist.description} />
                        </div>
                    ))}
                </Carousel>
                <div className='carrusel-dot-section' />
            </div>
        </section>
    );
};

export default CustomCarousel;
