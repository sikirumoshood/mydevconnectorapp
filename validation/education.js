const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {

    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    data.to = !isEmpty(data.to) ? data.to : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';


    if (Validator.isEmpty(data.school)) {
        errors.school = "School field is required";
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = "Degree of education field is required";
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = "From date field is required";
    }

    if (Validator.isEmpty(data.to)) {
        errors.to = "To date field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)

    }
}