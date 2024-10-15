// si no aclaro la ruta, por default va a public
import Navbar from './components/Navbar/Navbar';
import Navbar1 from './components/Navbar/Navbar1';

import React from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import AboutUs from './Pages/AboutUs';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Footer from './components/Footer/Footer';
import men_banner from './assets/banner_mens.png';
import women_banner from './assets/banner_women.png';
import kid_banner from './assets/banner_kids.png';
import AdminPanel from './Pages/AdminPanel';


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/men" element={<ShopCategory banner={men_banner} category="men"/>} />
        <Route path="/women" element={<ShopCategory banner={women_banner} category="women"/>} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kids"/>} />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<LoginSignup/>} />
        <Route path="/product/:productId" element={<Product/>} />
        <Route path='/admin' element={<AdminPanel/>}/>
      </Routes>
      <Footer/>
    </div>
  ) 
}

export default App

