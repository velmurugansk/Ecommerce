const jwt = require('jsonwebtoken');

const tokenVerify = async(req, res, next) => {        
    const {accessToken} = req.cookies;
    if(!accessToken) {
        return res.status(401).json({"status": false,"message":'Session out!, Login again!'});
    } else {
        try{
            const tokendecode = await jwt.verify(accessToken, process.env.SECRET_KEY);
            req.role = tokendecode.role;
            req.id = tokendecode.id;
            next();
        } catch(error) {
            return res.status(401).json({"status": false,"message":'Session out!, Login again!'});
        }
    }    
}

const verify = async(req, res) => {
    const {accessToken} = req.cookies;    
    if(!accessToken) {
        return res.status(401).json({"status": false,"message":'Session out!, Login again!'});
    } else {
        try{
            const tokendecode = await jwt.verify(accessToken, process.env.SECRET_KEY);
            const user = {
                id : tokendecode.id,
                role:tokendecode.role
            }     
            res.json({ user });       
        } catch(error) {
            return res.status(401).json({"status": false,"message":'Session out!, Login again!'});
        }
    }
}

module.exports = {tokenVerify, verify}