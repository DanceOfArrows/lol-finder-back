const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const platformUrls = require('./routes/url-names');

const urls = platformUrls.urls;
const { BR1, EUN1, EUW1, JP1, KR, LA1, LA2, NA1, OC1, TR1, RU } = urls;

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

//BR1, EUN1, EUW1, JP1, KR, LA1, LA2, NA1, OC1, TR1, RU

// const handleChampionId = (championId) => {
//     await 
// }

const handleRegionRequest = (region) => {
    if (region === 'BR1') return BR1;
    if (region === 'EUN1') return EUN1;
    if (region === 'EUW1') return EUW1;
    if (region === 'JP1') return JP1;
    if (region === 'KR') return KR;
    if (region === 'LA1') return LA1;
    if (region === 'LA2') return LA2;
    if (region === 'NA1') return NA1;
    if (region === 'OC1') return OC1;
    if (region === 'TR1') return TR1;
    if (region === 'RU') return RU;
}

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

module.exports = { asyncHandler, handleRegionRequest, handleValidationErrors, validatePassword };