const multer = require('multer');
const db=require("../databaseConnector")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); 
    }
  });
  
  exports.upload = multer({ storage }).fields([
      { name: 'image', maxCount: 1 },
      { name: 'categoryImage', maxCount: 1 },
    ]);
    
    exports.control=(req, res) => {
      
        
          const { description, productName, price, CategoryName } = req.body;
          const { image, categoryImage } = req.files;
      
        
        
      const imageUrl = `/uploads/${image[0].filename}`;
      const categoryImageUrl = `/uploads/${categoryImage[0].filename}`;
    
      const sqlGetCategoryId = 'SELECT category_id FROM category WHERE category_name = ?';
      db.query(sqlGetCategoryId, [CategoryName], (err, categoryResult) => {
        if (err) {
          res.status(500).json({ error: 'Failed to fetch category ID' });
        } else if (categoryResult.length === 0) {
          
          const sqlInsertCategory = 'INSERT INTO category  VALUES (default,?, ?)';
          db.query(sqlInsertCategory, [CategoryName, categoryImageUrl], (err, categoryInsertResult) => {
            if (err) {
              res.status(500).json({ error: 'Failed to insert category' });
            } else {
              const categoryId = categoryInsertResult.insertId;
              const sqlInsertProduct = 'INSERT INTO product VALUES (default, ?, ?, ?, ?)';
              db.query(sqlInsertProduct, [productName, imageUrl, price, description], (err, productResult) => {
                if (err) {
                  res.status(500).json({ error: 'Failed to insert product' });
                } else {
                  res.status(200).json({
                    message: 'Product inserted successfully',
                    imageUrl,
                    categoryImageUrl,
                  });
                }
              });
            }
          });
        } else {
          
          const categoryId = categoryResult[0].category_id;
          const sqlInsertProduct = 'INSERT INTO product VALUES (default, ?, ?, ?, ?)';
          db.query(sqlInsertProduct, [productName, imageUrl, price, description], (err, productResult) => {
            if (err) {
              res.status(500).json({ error: 'Failed to insert product' });
            } else {
              res.status(200).json({
                message: 'Product inserted successfully',
                imageUrl,
                categoryImageUrl,
              });
            }
          });
        }
      });
    
    }