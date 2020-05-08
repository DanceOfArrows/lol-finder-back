const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = Error("Bad request.");
        err.status = 400;
        err.title = "Bad request.";
        err.errors = errors;
        return next(err);
    }
    next();
};

function validatePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword.toString());
}

module.exports = { asyncHandler, handleValidationErrors, validatePassword };