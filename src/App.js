import React from "react";
import HeroRoutes from "./Routes/HeroRoutes";
import { AuthProvider } from './components/AuthContext'; 
import Home  from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart"
import { CartProvider } from './components/CartContext';
import AdminPage from "./components/AdminPage"
import AdminProduct from "./components/AdminProduct"
import Color from "./components/Color";
//import cart from "./components/Cart";

import  AdminProductModify  from './components/AdminProductModify';

import AdminOrder from "./components/AdminOrder"

function App() {
  return (
    <AuthProvider>
         <CartProvider>
       <Routes>
        <Route path="/*" element={<HeroRoutes />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/adminEclipce" element={<AdminPage/>}/>
        <Route path="/product" element={<AdminProductModify/>}/> 
        <Route path="/InsertProducts" element={<AdminProduct/>}/> 

      </Routes>
    </CartProvider>
  </AuthProvider>
     
       
  
   );
}

export default App;