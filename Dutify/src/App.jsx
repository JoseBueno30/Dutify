import TopBar from "./components/topBar/topBar";
import "./index.css";
import CardsGrid from "./components/cardsGrid/cardsGrid";


function App() {
  return (
    <>
      <TopBar></TopBar>
      <CardsGrid type={"genre"}></CardsGrid>
    </>
  );
}

export default App;
