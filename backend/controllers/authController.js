const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/authModels')

const userLogin = async (req, res) => {
    const {email, password} = req.body;    
    try {
        const finduser = await users.findOne({email}).select('+password');                
        if(finduser) {
            const paswd = await bcrypt.compare(password, finduser.password);
            if(paswd) {
                let id = finduser._id;
                let role = finduser.role;
                const token = await jwt.sign({id,role}, process.env.SECRET_KEY,{expiresIn:'7d'});                
                res.cookie('accessToken', token, {
                    expires : new Date(Date.now() + 7*24*60*60*1000), 
                    httpOnly: true,
                    sameSite: 'lax',
                    path: '/',
                    secure: false
                })
                res.status(200).json({"status": true,"message":'Login Successful!',token});
            } else {
                res.status(404).json({"status": false,"message":'Password wrong!'});    
            }
        } else {
            res.status(404).json({"status": false,"message":'Email not found!'});
        }
    } catch (error) {
        res.status(500).json({"status": false,"message":error.message});
    }
}

const userRegister = async(req, res) => {
    const {name, email, password} = req.body;
    try{

    } catch(error) {

    }
}

const userDetails =async(req, res) => {
    const {id} = req.body;
    try{
        const finduser = await users.findOne({_id:id}).select('+password');
        if(finduser) {
            res.status(200).json({"status": true,"data":finduser});
        } else {
            res.status(404).json({"status": false,"message":'User details wrong!'});  
        }

    } catch (error) {
        res.status(500).json({"status": false,"message":error.message});
    }
}

const userLogout = async(req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: 'lax', // or 'lax' or 'none'
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Use secure in production
        expires : ''
    });
    res.status(200).json({ status : true, message: 'Logged out successfully' });
}

module.exports = {userLogin, userRegister, userLogout, userDetails}