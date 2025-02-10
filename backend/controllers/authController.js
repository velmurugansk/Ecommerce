const adminModels = require('../models/adminModels');
const {responseReturn} = require('../utiles/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createToken = async (data) => {
    const token = await jwt.sign(data, process.env.SECRET, {
        expiresIn : '7d'
    });

    return token;
}

const adminLogin = async(req,res) => {
    let {email, password} = req.body;    
    try {
        const admin = await adminModels.findOne({email}).select('+password');
        if(admin) {
            const matchpwd = await bcrypt.compare(password, admin.password);
            if(matchpwd) {
                const token = await createToken({
                    id : admin._id,
                    role: admin.role
                });
                res.cookie('accessToken', token, {
                    expires : new Date(Date.now() + 7*24*60*60*1000)
                })
                responseReturn(res, 200, {token, message: 'Login Success.'});
            } else {
                responseReturn(res, 404, {error: 'Wrong password!'});
            }
        } else {
            responseReturn(res, 404, {error: 'Email not found!'});
        }
    } catch (error) {
        responseReturn(res, 500, {error: error.message});
    }
}

module.exports = {adminLogin}