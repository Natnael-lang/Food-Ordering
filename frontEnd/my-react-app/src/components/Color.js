import "../CSS/Color.css";
import { useState } from "react";

const Color=()=>{

  const [colorState,setColorState]=useState("")

    return(

        <div  className="container">

        <div className="box"  style={{backgroundColor:colorState}}></div>
        <input type="searchBox" value={colorState} onChange={(e)=>setColorState(e.target.value)}/>
        </div>
    )
}
export default Color;