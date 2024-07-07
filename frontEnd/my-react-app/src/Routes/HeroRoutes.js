import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn2 from "../components/SignIn2"
import SignUp2 from "../components/SignUp2";
import HeroPage from "../components/HeroPage";
import RestaurantDisplay from "../components/RestaurantDisplay";
import Home from "../components/Home";
//import Cart from "../components/Cart"
import { CartProvider } from '../components/CartContext';
import { AuthProvider } from '../components/AuthContext'; 

const HeroRoutes=()=>{
    return(
    
                <Routes>
                        <Route path="/" element={<HeroPage/>} /> 
                        <Route path="/SignUp2" element={<SignUp2/>} />
                        <Route path="/SignIn2" element={<SignIn2/>} />
                        <Route path="/Restaurant-navigation" element={<RestaurantDisplay/>} />
                        <Route path="/Home" element={<Home/> } />
                        
                        
                </Routes>
    
        
    )
}
export default HeroRoutes;