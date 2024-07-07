import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/AdminOrder.css';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/orders/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="admin-order-container">
      <h1>Admin Order Management</h1>
      <table className="admin-order-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Dish ID</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.user_id}</td>
              <td>{order.dish_id}</td>
              <td>{order.quantity}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrder;