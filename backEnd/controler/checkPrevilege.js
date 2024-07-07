const db = require("../databaseConnector");

exports.checkPrivilege = (req, res) => {
  const user_id = req.session.userId;
  const restaurant_id = req.body.Restaurant_id;

  console.log(restaurant_id);

  db.query('SELECT email FROM customer WHERE user_id = ?', [user_id], (err, userResults) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    if (userResults.length === 0) {
      return res.status(404).send('User not found');
    }

    const email = userResults[0].email;
    console.log(email)  

    db.query('SELECT * FROM restaurant WHERE email = ? AND Restaurant_id = ?', [email, restaurant_id], (err, restaurantResults) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred');
      }

      if (restaurantResults.length === 0) {
        return res.status(404).send('Restaurant not found or user is not the owner');
      }

      const restaurant = restaurantResults[0];
      console.log(restaurantResults);

      req.session.restaurantId = restaurant.Restaurant_id; // Assuming 'id' is the restaurant ID field
      return res.send('owner');
    });
  });
};

exports.isOwner = (req, res) => {
    if (req.session.restaurantId) {
        return res.status(200).send('ok')
    }
    return res.status(405).send('not ok')}