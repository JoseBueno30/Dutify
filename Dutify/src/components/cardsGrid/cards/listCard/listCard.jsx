import "./listCardStyle.css";
import "../cardsStyle.css";

function ListCard({ listName, background }) {

  const backgroundSrc = background ? background : "/assets/placeholder-img.png";

  return (
    <button
      className="card "
      title={"Ir a lista '" + listName + "'"}
      id="card_container"
      alt={listName + "_Imagen"}
      style={{ backgroundImage: `url(${backgroundSrc})` }}
    >
      <div className="cards-overlay title-fade">
        <p className="cards-title">{listName}</p>
      </div>
    </button>
  );
}

export default ListCard;
