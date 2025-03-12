import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/login/Login.jsx'
import Register from './components/register/Register.jsx'
import Home from './components/home/Home.jsx';
import NewProduct from './components/producto/NewProductComponent.jsx'
import EditProduct from './components/producto/EditProductComponent.jsx'
import Categories from './components/categories/Categories.jsx'
import CategoryProducts from './components/categories/CategoryProducts.jsx';
import User from './components/user/User.jsx';
import Search from './components/search/Search.jsx';
import UserById from './components/user/UserById.jsx';
import ProductId from './components/producto/pruductoId/ProductIdComponent.jsx'
import CartPage from './components/cart/CartPage.jsx';
import PurchasePage from './components/purchase/PurchasePage.jsx';
import {useEffect, useState } from "react";

const App = () => {
  const token = localStorage.getItem('token');
  const [isLogedIn, setIsLogedIn] = useState(!!token);

  useEffect(() => {}, [isLogedIn]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLoged={isLogedIn} />} />
        <Route path="/login" element={<Login setLogin={setIsLogedIn}/>} />
        <Route path="/register" element={<Register setLogin={setIsLogedIn}/>} />
        <Route path="/newProduct" element={<NewProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/products/:id" element={<ProductId isLoged={isLogedIn}/>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<CategoryProducts isLoged={isLogedIn}/>} />
        <Route path="/user" element={<User setLogout={setIsLogedIn} isLoged={isLogedIn}/>} />
        <Route path="/user/:id" element={<UserById isLoged={isLogedIn}/>} />
        <Route path="/search" element={<Search isLoged={isLogedIn}/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/purchase" element={<PurchasePage/>} />
      </Routes>
    </Router>
  );
}

export default App
