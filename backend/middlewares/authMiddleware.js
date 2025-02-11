const jwt = require('jsonwebtoken');

const validateSession = async(req, res, next) => {
    const {accessToken} = req.cookies;
    if(!accessToken) {
        responseReturn(res, 409, {error: 'Please Login!'});
    } else {
        try{
            const tokenDecode = await jwt.verify(accessToken, process.env.SECRET);
            req.role = tokenDecode.role;
            req.id = tokenDecode.id;
            next();
        } catch(error) {
            responseReturn(res, 409, {error: 'Please Login!'});    
        }
    }
}

module.exports = {validateSession}