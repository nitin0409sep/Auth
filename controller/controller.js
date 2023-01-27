const User = require('../src/models/models');

module.exports.register = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password != cpassword) {
            throw Error('Password and confirm passowrd not matches');
        }
        const user = new User({
            email: email,
            password: password,
            cpassword: cpassword
        })

        // JWT Token
        const token = await user.generateAuthToken();

        // Stroing JWT Token with Cookie On Browser 
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 300000)
        });

        const userData = await user.save();
        res.redirect('secret');
    } catch (err) {
        res.status(400).send(`Registration Error ${err}`);
        console.log(err);
    }
}



module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await User.findOne({ email: email });
        if (userEmail) {
            const val = await userEmail.loginMethod(password);
            if (val == true) {

                // JWT Token
                const token = await userEmail.generateAuthToken();

                // Stroing JWT Token with Cookie On Browser 
                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 800000)
                });

                // Render Secret Page Once Successfully Logged In
                res.redirect('secret');
            } else {
                throw Error('Inavlid Password')
            }
        } else {
            throw Error('Invalid Email');
        }
    } catch (err) {
        res.status(400).send('Invalid Credentials!');
    }
}


