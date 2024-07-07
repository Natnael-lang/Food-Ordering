import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");
  //const [category,setCategory]=useState("");
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setUploadedImage(URL.createObjectURL(file));
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('productName', productName);
  
  axios
      .post('http://localhost:5000/upload', formData)
      .then((response) => {
        console.log(response.data.message);
  
        setImage(null);
        setDescription('');
        setUploadedImage(null);
        setDescription("")
        setPrice("");
        setProductName("")
      })
      .catch((error) => {
        console.log(error.response.data)
          
      });/*
      let arr=[];
      axios
      .get('http://localhost:5000/upload')
      .then((req,res) => {
        arr=[...req.data];
         console.log(arr)
  
  })
      .catch((error) => {
        console.log(error.response.data)
          
      });*/
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {uploadedImage && <img src={uploadedImage} alt="Uploaded" />}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
       
        <button type="submit">Add Food Item</button>
      </form>
    </div>
  );
};
export default AdminDashboard;