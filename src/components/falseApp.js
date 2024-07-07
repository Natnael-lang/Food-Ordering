import React from "react";
import { Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from "./components/SignUp"
import Train from "./components/Train";

import Home from "./components/Home";
import SignUp from "./components/SignIn";
function App() {
  return (
    <>
    <Train/>
       <Home/>
      <div>

            
              <Routes>
                   
                      <Route path='/Sin' element={<SignIn /> } /> 
                      <Route path='/home' element={<SignUp /> } />
              </Routes>
      
    </div>
    
    </>
    
        
  
    
  );
};

export default App;
