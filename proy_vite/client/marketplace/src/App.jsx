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
import './App.css';
import Login from './Pages/Login';
import CheckOut from './Pages/CheckOut';
import Payment from './Pages/Payment';
import AdminPanel from './Pages/AdminPanel';
import Profile from './Pages/Profile';


const App = () => {
  return (
    <div className='main'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/men" element={<ShopCategory banner={men_banner} category="MEN"/>} />
        <Route path="/women" element={<ShopCategory banner={women_banner} category="WOMEN"/>} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="KIDS"/>} />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/signUp" element={<LoginSignup/>} />
        <Route path="/logIn" element={<Login/>} />
        <Route path="/checkout" element={<CheckOut/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/product/:productId" element={<Product/>} />
        <Route path='/admin' element={<AdminPanel/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      <Footer/>
    </div>
  ) 
}

export default App

