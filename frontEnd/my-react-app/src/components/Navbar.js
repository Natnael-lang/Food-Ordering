import React, { useState, useEffect, useContext } from "react";
import "../CSS/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faEllipsisV, faHeart } from '@fortawesome/free-solid-svg-icons';
import Popup from "./Popup";
import Cart from "./Cart";
import axios from 'axios';
import { CartContext } from './CartContext';

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    checkOwner();
  }, []);

  const checkOwner = async () => {
    try {
      const response = await axios.get('/isOwner');
      if (response.data === 'ok') {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } catch (err) {
      console.log(err.response.data);
      setIsOwner(false);
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const NavFunc = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "orange" : "black",
      textDecoration: isActive ? "underline" : "none"
    };
  };

  return (
    <div className="header-body">
      <div className="header-div">
        <div className="left-header-div"></div>

        <nav className="middle-header-div">
          <NavLink to="/home" style={NavFunc}>home</NavLink>
          <NavLink to="/orders" style={NavFunc} className="ho">orders</NavLink>
          <NavLink to="/contactUs" style={NavFunc} className="ho">contact us</NavLink>
        </nav>

        <div className="right-header-div">
          <div className="search-div">
            <input type="text" placeholder="Search" />
            <button><FontAwesomeIcon icon={faSearch} style={{ color: "darkGrey" }} /></button>
          </div>
          <div className="right-nav-icon">
            <NavLink><FontAwesomeIcon icon={faHeart} style={{ color: "red" }} /></NavLink>
            <NavLink to="/Cart" onClick={handleOpenPopup}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ color: "black" }} />
              
                
        
            </NavLink>
            <NavLink to='/adminEclipce' disabled={!isOwner} style={{ display: isOwner ? 'block' : 'none' }}>
              <FontAwesomeIcon icon={faEllipsisV} style={{ color: "black" }} />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="ad-div"> </div>

      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        <Cart />
      </Popup>
    </div>
  );
};

export default Navbar;