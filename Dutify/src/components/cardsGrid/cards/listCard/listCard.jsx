import "./listCardStyle.css";
import "../cardsStyle.css";

function ListCard({ listName, background }) {
  const backgroundSrc = background ? background : "/assets/placeholder-img.png";
  
  return (
    <button
      className="card"
      title={"Ir a playlist '" + listName + "'"}
      id="card_container"   
      alt={listName + "_Imagen"}
      style={{
        backgroundImage: background
          ? `url(${backgroundSrc})`
          : "var(--placeholder-img)",
      }}
    >
      <div className="card-body">
        <div className="cards-overlay title-fade">
          <h2 className="cards-title" aria-hidden="true">
            {listName}
          </h2>
        </div>
      </div>
    </button>
  );
}

export default ListCard;
