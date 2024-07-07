import { useContext } from 'react';
import { CartContext } from './CartContext';
import "../CSS/Cart.css"

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + (product.product_price * product.quantity), 0);
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.product_id}>
              <td>
                <img
                  src={`http://localhost:5000${product.product_image_path}`}
                  alt={product.product_name}
                  className="cart-table-image"
                />
              </td>
              <td>{product.product_name}</td>
              <td>{product.product_price} birr</td>
              <td>
                <button
                  onClick={() => updateQuantity(product.product_id, product.quantity - 1)}
                  disabled={product.quantity <= 1}
                  className="cart-table-button"
                >
                  -
                </button>
                {product.quantity}
                <button
                  onClick={() => updateQuantity(product.product_id, product.quantity + 1)}
                  className="cart-table-button"
                >
                  +
                </button>
              </td>
              <td>{(product.product_price * product.quantity).toFixed(2)} birr</td>
              <td>
                <button onClick={() => removeFromCart(product.product_id)} className="cart-table-button">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <h3>Total Price: {getTotalPrice().toFixed(2)} birr</h3>
      </div>
    </div>
  );
};

export default Cart;