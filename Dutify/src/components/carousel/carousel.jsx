import './carousel.css';
import left_arrow from './left_arrow.svg';
import right_arrow from './right_arrow.svg';

function Carousel({ name, id, lista }) {
  const button_target = `#${id}`;

  return (
    <section className='carrusel-container'>
      <div className='carrusel-box'>
        <h5 className='carrusel-h5'>{name}</h5>
        <div id={id} className="carousel" data-bs-ride="carousel">
          <div className="carousel-inner">
            {lista.map((playlist, index) => (
              <div key={playlist.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img className="d-block img-fluid" src={playlist.imageUrl} alt="" />
                <div className="carousel-caption d-md-block fw-bolder carrusel-caja-texto">
                  <p className='carrusel-texto fs-10'>
                    {playlist.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev carousel-button" type="button" data-bs-target={button_target} data-bs-slide="prev">
            <img src={left_arrow} alt="Previous" className='button-svg' />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next carousel-button" type="button" data-bs-target={button_target} data-bs-slide="next">
            <img src={right_arrow} alt="Next" className='button-svg' />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}


export default Carousel;
