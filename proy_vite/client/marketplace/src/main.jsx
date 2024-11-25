import React from "react";
import { createRoot } from 'react-dom/client' // DOM virtual con el que trabaja react
import App from './App' // main renderiza a app, por eso la trae
import {BrowserRouter} from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from 'react-redux';
//import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
