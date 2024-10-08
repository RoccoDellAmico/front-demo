import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // DOM virtual con el que trabaja react
import App from './views/App' // main renderiza a app, por eso la trae
//import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
