import React from "react";
import CatList from "./CatList";
import "../CSS/Category.css";
const Category=()=>{
    return(
        <>
         <div className="explor">
            <h1>Explor Our Menu</h1>
            <p>you can choose the food you desire</p>
         </div>
        <div className="Category-div">
           
           {CatList.map((val,ind)=>{return (<div key={ind} className="menuList-div">
              <img className="category-img"src={val} alt="no"/>
              <p>burger</p>
           </div> )   })}
       
        </div>
        <hr/>
    
        </>
        
        
    );
}

export default Category;