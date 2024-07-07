import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../CSS/RestaurantDisplay.css";
import { AuthContext } from './AuthContext'; // Import the AuthContext

const RestaurantDisplay = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsOwner } = useContext(AuthContext); // Destructure setIsOwner from AuthContext

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/RestaurantDisplay');
        setRestaurants(response.data.result);
        setLoading(false);
      } catch (err) {
        console.error(err.response.data);
        setError(err.response.data);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleVisitClick = async (restaurantId) => {
    try {
      const response = await axios.post('http://localhost:5000/checkPrivilege', { Restaurant_id: restaurantId });
      if (response.data === 'ok') {
        setIsOwner(true); // Set owner state to true
      } else {
        setIsOwner(false); // Set owner state to false
      }
      navigate('/Home');
    } catch (err) {
      console.error(err.response.data);
      setIsOwner(false); // Set owner state to false
      navigate('/Home');
    }
  };

  return (
    <div>
      <hr />
      <div className="restaurant-container">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-item">
            <div>
              <img
                src={`http://localhost:5000/Restaurant/${restaurant.Restaurant_image}`}
                alt={restaurant.Restaurant_name}
                className="restaurant-image"
              />
            </div>
            <div className="restaurant-info">
              <p className="restaurant-name">{restaurant.Restaurant_name}</p>
              <p className="restaurant-location">{restaurant.Restaurant_location}</p>
              <button onClick={() => handleVisitClick(restaurant.Restaurant_id)}>Visit Me</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDisplay;