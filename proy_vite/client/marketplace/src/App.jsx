import Navbar from './components/Navbar/Navbar';
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
import new_men_banner from './assets/BANNER-MEN.png';
import new_women_banner from './assets/BANNER-WOMEN.png';
import new_kids_banner from './assets/BANNER-KIDS.png';
import './App.css';
import Login from './Pages/LogIn';
import CheckOut from './Pages/CheckOut';
import Payment from './Pages/Payment';
import AdminPanel from './Pages/AdminPanel';
import Profile from './Pages/Profile';
import ErrorPage from './Pages/ErrorPage';
import Suggestion from './Pages/Suggestion';


const App = () => {
  return (
    <div className='main'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/men" element={<ShopCategory banner={new_men_banner} category="MEN"/>} />
        <Route path="/women" element={<ShopCategory banner={new_women_banner} category="WOMEN"/>} />
        <Route path="/kids" element={<ShopCategory banner={new_kids_banner} category="KIDS"/>} />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/signUp" element={<LoginSignup/>} />
        <Route path="/logIn" element={<Login/>} />
        <Route path="/checkout" element={<CheckOut/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/product/:productId" element={<Product/>} />
        <Route path='/admin' element={<AdminPanel/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/suggestion' element={<Suggestion/>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </div>
  ) 
}

export default App

