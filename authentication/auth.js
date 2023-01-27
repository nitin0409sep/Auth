const jwt = require('jsonwebtoken');

const User = require('../src/models/models');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        const verifyToken = jwt.verify(token, process.env.Secret_Key_JWT_Token);

        // User verification from DB
        const user = await User.findOne({ _id: verifyToken._id });

        if (user) {
            next();
        } else {
            res.redirect('login');
        }
    } catch (err) {
        res.redirect('login');
    }
}

module.exports = auth;