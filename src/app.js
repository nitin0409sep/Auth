const dotenv = require('dotenv');

const express = require('express');

const app = express();

dotenv.config({ path: '../config.env' });

const port = process.env.PORT;

require('./db/conn');

const router = require('../routes/router');

const path = require('path');

const cookieParser = require('cookie-parser');


const viewsPath = path.join(__dirname, '../views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(cookieParser());   // using as a middleware

app.set('view engine', 'hbs');

app.set('views', viewsPath);

app.use(router);

app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log("Server has started at port " + port);
})