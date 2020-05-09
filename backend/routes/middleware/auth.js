const config = require ('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token');

    //Check for session token
    if(!token) return res.status(401).json({msg: 'You are not logged in. Premission denied'});


    try{
        // Check if token is valid
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        //Add user from token value
        req.user = decoded;
        next();
    }catch(e) {
        res.status(400).json({msg: 'Invalid Token'})
    }
}

module.exports = auth;