const express = require('express');

const User = require('../src/models/models');

const jwt = require('jsonwebtoken');

const router = express.Router();

const auth = require('../authentication/auth');

const controller = require('../controller/controller');

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/login', async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.Secret_Key_JWT_Token);

        // User verification from DB
        const user = await User.findOne({ _id: verifyToken._id });

        if (user) {
            res.redirect('secret');
        } else {
            res.redirect('login');
        }
    } catch (err) {
        res.render('login');
    }
})

router.get('/register', async (req, res) => {

    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.Secret_Key_JWT_Token);

        // User verification from DB
        const user = await User.findOne({ _id: verifyToken._id });

        if (user) {
            res.redirect('secret');
        } else {
            res.redirect('register');
        }
    } catch (err) {
        res.render('register');
    }
})


router.get('/secret', auth, (req, res) => {
    res.render('secret');
})

router.get('/logout', auth, (req, res) => {
    res.cookie('jwt', "token", { maxAge: 1 });
    res.render('login');
})


router.post('/register', controller.register);

router.post('/login', controller.login);

module.exports = router;