const multer = require('multer');
const db=require("../databaseConnector")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/Restaurant/'); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); 
    }
  });
  const upload = multer({ storage });

  exports.Upload=upload.single("RestaurantImage")

  exports.RestaurantImage = (req, res) => {
    const { RestaurantLocation, email, RestaurantName } = req.body;
    const RestaurantImage = req.file ? req.file.filename : null;
    console.log(req.body);
  
    const sqlInsertProduct = 'INSERT INTO Restaurant VALUES (default, ?, ?, ?, ?)';
    db.query(sqlInsertProduct, [RestaurantName, RestaurantLocation, RestaurantImage,email], (err, productResult) => {
      if (err) {
        console.error('Error inserting product:', err);
        res.status(500).json({ error: 'Failed to insert product' });
      } else {
        res.status(200).json({
          message: 'Product inserted successfully',
          imageUrl: RestaurantImage,
        });
      }
    });
  };