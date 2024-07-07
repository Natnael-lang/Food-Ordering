const db=require("../databaseConnector");

const sql="select * from Restaurant";


  exports.RestaurantData=(req,res)=>{
    db.query(sql,(error,result)=>{
        if (error) {
            res.status(500).json({ error: 'Failed to fetch Restaurant' });
          } else {
           
            res.status(200).json({
              message: 'Restaurant fetched successfully',
               result
              
            });
          }
        })
}
