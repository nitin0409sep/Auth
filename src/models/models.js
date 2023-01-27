const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

// Hashing Password
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
            this.cpassword = undefined;
        }
        next();
    } catch (err) {
        console.log(`Hashing Password at time of Registration ${err}`);
    }
})


// Login Password Checking
userSchema.methods.loginMethod = async function (userPassword) {
    try {
        const val = await bcrypt.compare(userPassword, this.password);
        return val;
    } catch (err) {
        console.log(`Login Password Checking ${err}`);
    }

};

// Token generate during registration
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.Secret_Key_JWT_Token);
        return token;
    } catch (err) {
        console.log(`Token generate during registration ${err}`);
    }
}

// Model
const User = mongoose.model("User", userSchema);

module.exports = User;