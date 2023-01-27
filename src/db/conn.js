const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const DB = process.env.DB;

const connection = async () => {
    try {
        const user = await mongoose.connect(DB);
        if (user) {
            console.log("Connection Successfull");
        } else {
            console.log('Error');
        }
    } catch (err) {
        console.log(err);
    }
}

connection();