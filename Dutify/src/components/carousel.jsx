import './carousel.css';

function Carousel({children}) {
  
  return (
    <div id="customCarousel" className="carousel" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src="https://via.placeholder.com/800x400?text=First+Slide" alt="First slide" />
          <div class="carousel-caption d-none d-md-block fw-bolder">{children}</div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="https://via.placeholder.com/800x400?text=Second+Slide" alt="Second slide" />
          <div class="carousel-caption d-none d-md-block fw-bolder">{children}</div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="https://via.placeholder.com/800x400?text=Third+Slide" alt="Third slide" />
          <div class="carousel-caption d-none d-md-block fw-bolder">{children}</div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#customCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#customCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
