import React from 'react';
import { Link } from 'react-router-dom';
import "../CSS/HeroPage.css"

const HeroPage = () => {
  return (
    <div className="hero-content">
      <h1>Welcome to My App</h1>
      <p>Discover the best features of our application.</p>
      <div className="hero-actions">
        <Link to="/SignIn2" className="hero-btn">
          Sign In
        </Link>
        <Link to="/SignUp2" className="hero-btn">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default HeroPage;