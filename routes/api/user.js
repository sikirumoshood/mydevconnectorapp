const express = require('express');
const Router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport'); //for protected routes
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Models
const User = require('../../models/User');

//@ROUTE: GET api/user/test
//@DESC: test route
//@ACCESS: PUBLIC
Router.get('/test', (req, res) => res.json({ message: 'User works!' }));



//@ROUTE: POST api/user/register
//@DESC: registers a new user
//@ACCESS: PUBLIC
Router.post('/register', (req, res) => {

    //Input validation

    const { errors, isValid } = validateRegisterInput(req.body);

    //Check if errors exist
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //check if user with the email already exists
    User
        .findOne({ email: req.body.email })
        .then(user => {

            if (user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            }

            else {

                const avatar = gravatar.url(req.body.email, {

                    s: '200',   //size
                    r: 'pg',    //rating
                    d: 'mm'     //defualt
                })

                const newUser = User({

                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,

                });

                //Encrypting password

                bcrypt.genSalt(10, (err, salt) => {

                    bcrypt.hash(newUser.password, salt, (err, hash) => {

                        if (err) {
                            throw err;
                        }
                        else {

                            //Store password hash
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.status(200).json(user))
                                .catch(err => console.log(err));
                        }


                    })
                })
            }


        })


});

//@ROUTE: POST api/user/login
//@DESC: logins a user / generate jwebtoken
//@ACCESS: PUBLIC

Router.post('/login', (req, res) => {

    //Input validation

    const { errors, isValid } = validateLoginInput(req.body);

    //Check if errors exist
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    //Check if user exists 

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                errors.email = "User not found";
                return res.status(404).json(errors)
            }


            //check password 

            bcrypt.compare(password, user.password)
                .then(isMatch => {

                    if (!isMatch) {

                        errors.password = "Password is incorrect";
                        return res.status(404).json(errors);
                    }

                    else {

                        //create Token for user

                        const payload = { id: user.id, name: user.name, email: user.email, avatar: user.avatar };

                        jwt.sign(payload, keys.tokenKey, { expiresIn: 3600 }, (err, token) => {

                            return res.json({
                                message: 'success',
                                token: `Bearer ${token}`

                            });

                        });


                    }
                })
                .catch(err => console.log('BCRYPT-ERROR: ' + err));
        })
        .catch(err => {

            errors.login = "These credentials does not match any of our records";
            console.log("AUTH-ERROR-LOGIN: " + err);
            return res.status(404).json(errors);
        })

});


//@ROUTE: POST api/user/current
//@DESC: Current logged in user
//@ACCESS: Private

Router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.json({

        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar

    });
});

module.exports = Router;