import { useEffect, useState } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";
import ListModal from "../../listModal/listModal";
import { getUserPlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import "./listsStyle.css";
import Spinner from "../../spinner/spinner";

function Lists({}) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarPlaylists = async () => {
    setLoading(true);
    setLists(await getUserPlaylists().finally(() => setLoading(false)));
  };

  useEffect(() => {
    document.title = "Mis listas | Dutify";
    cargarPlaylists();
  }, []);

  const listButtonClickHandler = (e) => {
    const key = e.currentTarget.id;
    window.location.href = "listas/playlist?playlistId=" + key;
  };

  return (
    <section className="lists-section" aria-labelledby="section-header" aria-busy={loading}>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <h2
            className="h5-recent-lists"
            id="section-header"
            aria-live="assertive"
          >
            Mis PlayLists:
          </h2>
          <CardsGrid
            type="list"
            data={lists}
            clickFunction={listButtonClickHandler}
          ></CardsGrid>
          <ListModal />
        </>
      )}
    </section>
  );
}

export default Lists;
