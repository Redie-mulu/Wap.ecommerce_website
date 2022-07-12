const jwt = require('jsonwebtoken');

const PRIVATE_KEY = "rediet";

exports.validateToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        // validate the token. If not valid -> throw error, otherwise extract username put in the request
        try {
            const tokenObj = jwt.verify(token, PRIVATE_KEY);
            req.username = tokenObj.username;
            next();
        } catch(err) {
            throw new Error("Invalid access. Token is malformed");
        }
    } else {
        throw new Error("Invalid access. Token is missing.")
    }
    
}