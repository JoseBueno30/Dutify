import "./listCardStyle.css";
import "../cardsStyle.css";

function ListCard({ listName, background }) {

  return (
    <button
      className="card "
      title={"Ir a lista '" + listName + "'"}
      id="card_container"
      alt={listName + "_Imagen"}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="cards-overlay title-fade">
        <p className="cards-title">{listName}</p>
      </div>
    </button>
  );
}

export default ListCard;
