const jwt = require('jsonwebtoken');
const checkLogin =  (req, res, next) =>{
    try{
        const {authorization} = req.headers;
        const token = authorization.split(" ")[1];
        const decoded =  jwt.verify(token, process.env.JWT_TOKEN);
        const {username, userId} = decoded;
        req.username = username;
        req.userId = userId;
        // console.log(decoded)
        next();
    } catch {
        next("Authentication failed");
    }
}

module.exports = checkLogin;