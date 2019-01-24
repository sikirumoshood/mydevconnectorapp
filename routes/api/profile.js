const express = require('express');
const Router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const passport = require('passport');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


//@ROUTE: GET api/profile
//@DESC Get current user profile
//@ACCESS Private

Router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {

            if (!profile) {
                errors.noprofile = 'No profile exists for this user.';
                return res.status(404).json(errors);
            }

            return res.json(profile);
        })
        .catch(err => {
            errors.finderror = "Error finding user";
            return res.status(404).json(errors);
        });

});

//@ROUTE: GET api/profile/handle/:handle
//@DESC Get user profile by handle
//@ACCESS public

Router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "Profile not found for this handle";
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => {

            errors.find = "Error finding user with handle";
            return res.status(400).json(errors);
        })


});

//@ROUTE: GET api/profile/handle/:id
//@DESC Get user profile by id
//@ACCESS public

Router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "Profile not found for this id";
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => {

            errors.find = "Error finding user with id";
            return res.status(400).json(errors);
        })


});

//@ROUTE: GET api/profile/all
//@DESC Get all profiles
//@ACCESS public

Router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "No profiles found";
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => {

            errors.find = "Error fetching all profiles";
            return res.status(400).json(errors);
        })


});

//@ROUTE: POST api/profile
//@DESC Creates or edit current user profile
//@ACCESS Private

Router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    //Getting data from request
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //Skills is entered as comma separated, splitting into an array

    if (req.body.skills) {
        profileFields.skills = req.body.skills.split(',');
    }

    //Social is an object

    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;


    //Check if user with the profile exists

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                //update
                Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile))
                    .catch(err => {
                        errors.update = 'Error updating profile';
                        return res.json(errors);
                    });
            }
            else {
                //create profile for user

                //check if handle exists

                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {

                        if (profile) {
                            errors.handle = 'User with handle exists'
                            return res.status(400).json(errors);
                        }
                        else {

                            // Save
                            new Profile(profileFields).save().then(profile => res.json(profile))
                                .catch(err => {
                                    errors.create = 'Error creating profile';
                                    return res.status(500).json(errors);
                                });
                        }
                    })
                    .catch(err => {
                        errors.find = 'Error finding user';
                        return res.status(500).json(errors);

                    })
            }

        })




});

//@ROUTE: POST api/profile/experience
//@DESC Adds experience to profile
//@ACCESS Private

Router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {

        return res.status(400).json(errors);

    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {

            if (profile) {
                //Collect data

                const newExperience = {

                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description,

                }
                //add to experience array in profile

                profile.experience.unshift(newExperience);

                profile.save().then(profile => res.json(profile))
                    .catch(err => {

                        errors.experience = 'Unable to add experience to profile';
                        return res.status(500).json(errors);
                    })


            }

        })
        .catch(err => {

            errors.experience = 'Error finding user profile to add experience';
            return res.status(500).json(errors);
        })


});

//@ROUTE: POST api/profile/education
//@DESC Adds education to profile
//@ACCESS Private

Router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {

        return res.status(400).json(errors);

    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {

            if (profile) {
                //Collect data

                const newEducation = {

                    school: req.body.school,
                    degree: req.body.degree,
                    fieldofstudy: req.body.fieldofstudy,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description,

                }
                //add to experience array in profile

                profile.education.unshift(newEducation);

                profile.save().then(profile => res.json(profile))
                    .catch(err => {

                        errors.experience = 'Unable to add experience to profile';
                        return res.status(500).json(errors);
                    })


            }

        })
        .catch(err => {

            errors.experience = 'Error finding user profile to add experience';
            return res.status(500).json(errors);
        })


});

//@ROUTE: DELETE api/profile/experience/:exp_id
//@DESC Deletes experience
//@ACCESS Private

Router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {}
    Profile.findOne({ user: req.user.id })
        .then(profile => {

            if (profile) {

                //Delete experience with id exp_id

                let expIdArray = profile.experience.map(exp => exp.id);

                //find index of exp_id
                const delIndex = expIdArray.indexOf(req.params.exp_id);

                if (delIndex < 0) {
                    errors.experience = 'Invalid experience id';
                    return res.status(400).json(errors);
                }
                //make delete
                profile.experience.splice(delIndex, 1);

                profile.save().then(profile => res.json(profile))
                    .catch(err => {

                        errors.experience = 'Unable to delete experience';
                        return res.status(500).json(errors);
                    })


            }
            else {

                errors.experience = 'Unable to access profile';
                return res.status(400).json(errors);
            }

        })
        .catch(err => {

            errors.experience = 'Error finding the experience to delete';
            return res.status(500).json(errors);
        })


});

//@ROUTE: DELETE api/profile/education/:edu_id
//@DESC Deletes education
//@ACCESS Private

Router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {}
    Profile.findOne({ user: req.user.id })
        .then(profile => {

            if (profile) {

                //Delete experience with id exp_id

                let eduIdArray = profile.education.map(edu => edu.id);

                //find index of exp_id
                const delIndex = eduIdArray.indexOf(req.params.edu_id);

                if (delIndex < 0) {
                    errors.education = 'Invalid education id';
                    return res.status(400).json(errors);
                }
                //make delete
                profile.education.splice(delIndex, 1);

                profile.save().then(profile => res.json(profile))
                    .catch(err => {

                        errors.ed = 'Unable to delete ed';
                        return res.status(500).json(errors);
                    })


            }
            else {

                errors.education = 'Unable to access profile';
                return res.status(400).json(errors);
            }

        })
        .catch(err => {

            errors.education = 'Error finding the education to delete';
            return res.status(500).json(errors);
        })


});

//@ROUTE: DELETE api/profile
//@DESC Deletes user and profile
//@ACCESS private

Router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {}
    Profile.findOneAndDelete({ user: req.user.id })
        .then(() => {
            // also delete user

            User.findOneAndDelete({ _id: req.user.id })
                .then(() => res.json({ message: 'User and associated profile deleted respectively...' }))
        })
        .catch(err => {

            errors.noprofile = "No profile for this user to be deleted";
            return res.status(400).json(errors);
        });

});

module.exports = Router;