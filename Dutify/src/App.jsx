import { useState } from 'react'
import './App.css'
import MusicPlayer from './components/musicPlayer/musicPlayer'
import TopBar from "./components/topBar/topBar";
import "./index.css";
import CardsGrid from "./components/cardsGrid/cardsGrid";


function App() {
  return (
    <>
      <TopBar></TopBar>
      <CardsGrid type={"genre"}></CardsGrid>
      <MusicPlayer></MusicPlayer>
    </>
  );
}

export default App;
