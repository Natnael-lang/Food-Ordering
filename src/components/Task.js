import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../CSS/Task.css';
import { CartContext } from './CartContext';

const Task = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/upload');
        setProducts(response.data.result);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data);
        setError(err.response.data);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <hr />
      <div className="Task-img-div">
        {products.map((product, index) => (
          <div key={index} className="individual-div">
            <div>
              <img
                src={"http://localhost:5000" + product.product_image_path}
                alt={product.product_name}
                className="TaskImg"
              />
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
            <div className="text-div">
              <p className="productName-p">{product.product_name}</p>
              <p className="description-p">{product.product_description}</p>
              <p className="productPrice-p">{product.product_price} birr</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;