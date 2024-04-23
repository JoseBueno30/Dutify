import "./styles/listCardStyle.css"
import image from "../assets/mora_estrella.jpg"

function ListCard({listName, listImage}) {
  return (
    <div className="card text-bg-dark m-3" id="main_container">
      <img src={image} className="card-img" alt={listName + '_Imagen'} />
      <div className="card-img-overlay title h-50">
        <p className="card-title">{listName}</p>
      </div>
    </div>
  );
}

export default ListCard
