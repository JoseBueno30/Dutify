import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Carousel from './components/carousel.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AddButton from './components/addButton.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
    <Carousel>NombreArtista</Carousel>
    <section>
      <AddButton>Crear nueva lista</AddButton>
      <AddButton>Añadir nueva canción</AddButton>
    </section>
    </>
  </React.StrictMode>,
)
