const express = require('express');
const Router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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

    //check if user with the email already exists
    User
        .findOne({ email: req.body.email })
        .then(user => {

            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
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

    const email = req.body.email;
    const password = req.body.password;

    //Check if user exists 

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }


            //check password 

            bcrypt.compare(password, user.password)
                .then(isMatch => {

                    if (!isMatch) {
                        return res.status(404).json({ password: "Password incorrect" });
                    }

                    else {

                        return res.status(200).json({ msg: "You are logged in" });
                    }
                })
                .catch(err => console.log('BCRYPT-ERROR: ' + err));
        })

});


module.exports = Router;