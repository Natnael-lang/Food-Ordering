import React from "react";
import "../CSS/AdminHeader.css"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
const AdminHeader=()=>{
    return(
        <div  className="admin-header">
           <NavLink><FontAwesomeIcon className="admin-profile" icon={faUser}  /></NavLink>
        </div>
    )
}

export default AdminHeader;