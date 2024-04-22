import image from "../assets/mora_estrella.jpg"
import "./styles/listCardStyle.css"

function ListCard() {
  return (
    <div className="card text-bg-dark m-3 " id="main_container">
      <img src={image} className="card-img" alt="..." />
      <div className="card-img-overlay title h-50">
        <p className="card-title">ESTRELLA</p>
      </div>
    </div>
  );
}

export default ListCard
