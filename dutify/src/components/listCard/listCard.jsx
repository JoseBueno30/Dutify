import "./styles/listCardStyle.css"

function ListCard({ listName, listImage }) {
  return (
    <div className="card text-bg-dark m-3" id="main_container" alt={listName + '_Imagen'}>
      <img src={listImage} className="card-img" />
      <div className="card-img-overlay title h-50">
        <p className="card-title">{listName}</p>
      </div>
    </div>
  );
}

export default ListCard;

