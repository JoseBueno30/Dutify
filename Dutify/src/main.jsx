import React from 'react'
import ReactDOM from 'react-dom/client'
import TopBar from './components/topBar'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TopBar></TopBar>
  </React.StrictMode>,
)
