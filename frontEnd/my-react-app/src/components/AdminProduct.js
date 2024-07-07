import React, { useState } from 'react';
import axios from 'axios';
import "../CSS/AdminProduct.css";

const AdminProduct = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [CategoryName,setCategory]=useState("")
  const [categoryImage,setCategoryImage]=useState("");
  const [uploadedCategoryImage,setUploadedCategoryImage]=useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setUploadedImage(URL.createObjectURL(file));
  };
  const handleCategoryImage= (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    setUploadedCategoryImage(URL.createObjectURL(file));
  };
  
 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('productName', productName);
     formData.append('categoryImage',categoryImage)
     formData.append('CategoryName',CategoryName)
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
        setCategory("");
        setCategoryImage("");
        setUploadedCategoryImage("");
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
    <div   className='admin-product-wrapper'>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className='admin-product-form'>
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
        <input  type="text"
         placeholder="Category Name"  
         value={CategoryName} 
         onChange={(e) => setCategory(e.target.value)}
         />
         <input type="file" accept="image/*" onChange={handleCategoryImage} />
         {uploadedCategoryImage && <img src={uploadedCategoryImage} alt="Uploaded" />}
        <button type="submit">Add Food Item</button>
      </form>
    </div>
  );
};
export default AdminProduct;