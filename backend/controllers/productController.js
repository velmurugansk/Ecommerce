const products = require('../models/productModels');

const productList = async(req, res) => {    
    const {_id} = req.query;
    try{        
        if(_id) {
            const fetchdata = await products.findOne({_id});             
            return res.status(200).json({status:true,data:fetchdata}); 
        } else {
            const fetchdata = await products.find({});        
        return res.status(200).json({status:true,data:fetchdata});
        }        
    } catch(error) {
        return res.status(400).json({"status": false,"message":'Something went wrong!'})
    }
}


module.exports = {productList}