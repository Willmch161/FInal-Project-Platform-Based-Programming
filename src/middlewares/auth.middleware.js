const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization ? authorization.split(' ')[1] : undefined;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};