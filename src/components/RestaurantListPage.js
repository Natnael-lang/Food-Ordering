import React, { useState } from 'react';
import axios from 'axios';

import "../CSS/RestaurantListPage.css"

const RestaurantListPage= () => {
  const [RestaurantLocation, setRestaurantLocation] = useState('');
  const [RestaurantImage, setRestaurantImage] = useState(null);
  const [email, setEmail] = useState("");
  const [RestaurantName, setRestaurantName] = useState("");
  const [UploadedImage,setUploadedImage] =useState(" ")
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRestaurantImage(file);
    setUploadedImage(URL.createObjectURL(file));
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('RestaurantImage', RestaurantImage);
    formData.append('RestaurantLocation',RestaurantLocation);
    formData.append('email', email);
    formData.append('RestaurantName', RestaurantName);
  
  axios
      .post('http://localhost:5000/RestaurantList', formData)
      .then((response) => {
        console.log(response.data.message);
  
        setRestaurantImage("");
        setRestaurantName('');
        setEmail("");
        setRestaurantLocation("");
        setUploadedImage("");
      
      })
      .catch((error) => {
        console.log(error.response.data)
          
      });
  };

  return (
    <div>
      <h2>General Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="RestaurantName"
          value={RestaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="RestaurantLocation"
          value={RestaurantLocation}
          onChange={(e) => setRestaurantLocation(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {UploadedImage && <img src={UploadedImage} alt="Uploaded" />}
       
        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
};
export default RestaurantListPage;