import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from '../components/SignIn';
import  AdminProductModify  from '../components/AdminProductModify';

const AdminRoutes=()=>{
    return(
    
                <Routes>
                        
                        <Route path="/product" element={<AdminProductModify/>}/>

        
                </Routes>
    
        
    )
}
export default AdminRoutes;