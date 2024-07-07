const db=require("../databaseConnector");

const sql="select * from product";


  exports.productData=(req,res)=>{
    db.query(sql,(error,result)=>{
        if (error) {
            res.status(500).json({ error: 'Failed to fetch product' });
          } else {
           
            res.status(200).json({
              message: 'Product fetched successfully',
               result
              
            });
          }
        })
}
