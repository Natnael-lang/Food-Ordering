import React from "react";
import  "../CSS/AdminSider.css"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,  faTags,faHome,faUtensils,faCalculator } from '@fortawesome/free-solid-svg-icons';
const NavFunc=({isActive})=>{
    return( {fontWeight:isActive?"bold":"normal",
              color:isActive?"orange":"white",
               textDecoration:isActive?"underline":"none"})}

const AdminSider=()=>{
    
    return(
        <>
          
                <div className="admin-sider">
                       <div><FontAwesomeIcon   className="admin-icons"icon={faHome} /><NavLink style={NavFunc}to="/">Dashboard</NavLink></div>
                        <div><FontAwesomeIcon className="admin-icons"icon={faUser} /><NavLink style={NavFunc}to="/InsertProducts">InserProducts</NavLink></div>
                        <div><FontAwesomeIcon className="admin-icons"icon={faTags} /><NavLink style={NavFunc} to="/category">Category</NavLink></div>
                        <div><FontAwesomeIcon className="admin-icons"icon={faUtensils} /><NavLink style={NavFunc} to="/product" >Products</NavLink></div>
                        <div><FontAwesomeIcon className="admin-icons"icon={faCalculator} /><NavLink style={NavFunc} to="/orders">Orders</NavLink></div>
                    
                    
                </div>
            
        </>   
        
            )
}

export default AdminSider;