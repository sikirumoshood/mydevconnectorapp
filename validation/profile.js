const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {

    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!Validator.isLength(data.handle, { min: 4, max: 30 })) {
        errors.handle = "Handle must be between 4 and 30 characters";
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Handle field is required";
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "Status field is required";
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = "Skills field is required";
    }

    if (!isEmpty(data.website))
        if (!Validator.isURL(data.website))
            errors.website = "Invalid URL format";

    if (!isEmpty(data.twitter))
        if (!Validator.isURL(data.twitter))
            errors.twitter = "Invalid URL format";

    if (!isEmpty(data.instagram))
        if (!Validator.isURL(data.instagram))
            errors.instagram = "Invalid URL format";

    if (!isEmpty(data.linkedin))
        if (!Validator.isURL(data.linkedin))
            errors.linkedin = "Invalid URL format";

    if (!isEmpty(data.facebook))
        if (!Validator.isURL(data.facebook))
            errors.facebook = "Invalid URL format";

    return {
        errors,
        isValid: isEmpty(errors)

    }
}