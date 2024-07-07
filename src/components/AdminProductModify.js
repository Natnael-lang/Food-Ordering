import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../CSS/AdminProductModify.css"

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:5000/upload')
      .then((response) => {
        setProducts(response.data.result);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/upload/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/upload/${editingProduct.id}`, editingProduct);
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? { ...editingProduct } : product
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) =>
            editingProduct?.product_id === product.product_id ? (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>
                  <input
                    type="text"
                    value={editingProduct.product_name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, product_name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editingProduct.product_price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, product_price: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editingProduct.product_description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, product_description: e.target.value })
                    }
                  />
                </td>
                <td>
                  <button onClick={handleUpdate}>Submit</button>
                </td>
              </tr>
            ) : (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>{product.product_price}</td>
                <td>{product.product_description}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;