import React from "react";
import "../CSS/AdminPage.css";
import AdminRoutes from "../Routes/AdminRoutes.js"
import AdminHeader from "./AdminHeader";
import AdminSider from "./AdminSider";
const AdminPage=()=>{
        return(
            <>
                 <AdminHeader/>
                 <AdminSider/>
                 <div className="admin-main-containt">
                    {/* <AdminRoutes/> */}
                 </div>
            </>
                
        )
}
export default AdminPage;