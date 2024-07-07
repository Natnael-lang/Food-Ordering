import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../CSS/Task.css"

const Task = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(1); // Assuming a user is already logged in

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
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

  const addToCart = async (product) => {
    try {
      await axios.post('http://localhost:5000/cart', {
        userId,
        productId: product.product_id,
        quantity: 1,
      });
      // setCart([...cart, { ...product, quantity: 1 }]);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const updateCartQuantity = async (product, operation) => {
    try {
      await axios.put('http://localhost:5000/cart', {
        userId,
        productId: product.product_id,
        quantity: operation === 'increment' ? product.quantity + 1 : product.quantity - 1,
      });
      setCart(
        cart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: operation === 'increment' ? item.quantity + 1 : item.quantity - 1 }
            : item
        )
      );
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const removeFromCart = async (product) => {
    try {
      await axios.delete(`http://localhost:5000/cart?userId=${userId}&productId=${product.product_id}`);
      setCart(cart.filter((item) => item.product_id !== product.product_id));
    } catch (err) {
      console.log(err.response.data);
    }
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
      <div className='Task-img-div'>
        {products.map((product, index) => (
          <div key={index} className='individual-div'>
            <div>
              <img src={"http://localhost:5000" + product.product_image_path} alt={product.product_name} className='TaskImg' />
              <button
                className='add-to-cart-btn'
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
            <div className='text-div'>
              <p className='productName-p'>{product.product_name}</p>
              <p className='description-p'>{product.product_description}</p>
              <p className='productPrice-p'>{product.product_price} birr</p>
            </div>
          </div>
        ))}
      </div>
{/* {
      <div className='cart-div'>
        {cart.map((item, index) => (
          <div key={index} className='cart-item'>
            <img src={"http://localhost:5000" + item.product_image_path} alt={item.product_name} className='cart-img' />
            <div className='cart-info'>
              <p className='cart-name'>{item.product_name}</p>
              <div className='cart-quantity'>
                <button onClick={() => updateCartQuantity(item, 'decrement')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateCartQuantity(item, 'increment')}>+</button>
              </div>
              <p className='cart-price'>{item.product_price * item.quantity} birr</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div> }  */}
    </div>
  );
};

export default Task;
