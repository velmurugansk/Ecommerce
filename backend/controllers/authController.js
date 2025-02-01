const adminModels = require('../models/adminModels');
const {responseReturn} = require('../utiles/response');

const adminLogin = async(req,res) => {
    let {email, password} = req.body;    
    try {
        const admin = await adminModels.findOne({email}).select('+password');
        if(admin) {

        } else {
            responseReturn(res, 404, {error: 'Email not found!'});
        }
    } catch (error) {
        responseReturn(res, 500, {error: error.message});
    }
}

module.exports = {adminLogin}