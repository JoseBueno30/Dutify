import { useEffect, useState, useContext } from "react";
import CardsGrid from "../../cardsGrid/cardsGrid";
import ListModal from "../../listModal/listModal";
import { getUserPlaylists } from "../../../spotifyApi/SpotifyApiCalls";
import "./listsStyle.css";
import Spinner from "../../spinner/spinner";
import { PageHandlerContext } from "../../../App";

function Lists({}) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const setPage = useContext(PageHandlerContext).setPage;
  const setPlaylistId = useContext(PageHandlerContext).setPlaylistId;

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
    setPlaylistId(key);
    setPage("playlist");
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
