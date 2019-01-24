const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {

    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = "Incorrect email format";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be atleast 6 characters long";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)

    }
}