import './carousel.css';
import left_arrow from '../assets/left_arrow.svg';
import right_arrow from '../assets/right_arrow.svg';

function Carousel({children}) {
  
  return (
    <div id="customCarousel" className="carousel" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block img-fluid" src="image.jpg" alt="First slide" />
          <div class="carousel-caption d-md-block fw-bolder">
            <div className='texto-centrado'>
              {children}
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block img-fluid" src="image2.jpg" alt="Second slide" />
          <div class="carousel-caption d-md-block fw-bolder">
            <div className='texto-centrado'>
              {children}
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block img-fluid" src="image3.jpg" alt="Third slide" />
          <div class="carousel-caption d-md-block fw-bolder">
            <div className='texto-centrado'>
              {children}
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev carousel-button" type="button" data-bs-target="#customCarousel" data-bs-slide="prev">
        <img src={left_arrow} alt="Previous" className='button-svg' />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next carousel-button" type="button" data-bs-target="#customCarousel" data-bs-slide="next">
        <img src={right_arrow} alt="Previous" className='button-svg' />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
