const db=require("../databaseConnector")
exports.post= (req, res) => {
    const { userId, productId, quantity } = req.body;
    db.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity],
      (err, result) => {
        if (err) throw err;
        res.json({ message: 'Item added to cart' });
      }
    );
  };
  
exports.put=(req, res) => {
    const { userId, productId, quantity } = req.body;
    db.query(
      'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
      [quantity, userId, productId],
      (err, result) => {
        if (err) throw err;
        res.json({ message: 'Cart quantity updated' });
      }
    );
  };
  
 exports.delete=(req, res) => {
    const { userId, productId } = req.query;
    db.query(
      'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId],
      (err, result) => {
        if (err) throw err;
        res.json({ message: 'Item removed from cart' });
      }
    );
  };
  