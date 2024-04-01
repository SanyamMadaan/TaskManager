const jwt = require('jsonwebtoken');
const key = require('../config');

const authmiddleware = (req, res, next) => {
    const authHeader = req.headers.token;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({ msg: "Invalid Token" });
    }

    try {
        const receivedToken = authHeader.split(' ')[1];
        const decoded = jwt.verify(receivedToken, key);
        req.userId = decoded.Id; // Set userId to the decoded token's userId property
        next();
    } catch (e) {
        console.error("Error in token verification:", e);
        res.status(403).json({ msg: "Invalid Token" });
    }
};

module.exports = authmiddleware;
