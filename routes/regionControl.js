const express = require('express');

const { asyncHandler } = require('../utils');

const router = express.Router();

const regionCheck = (requestRegion) => {
    // if requestRegion is not equal to any regions, return false 
    if (requestRegion !== 'BR1' &&
        requestRegion !== 'EUN1' &&
        requestRegion !== 'EUW1' &&
        requestRegion !== 'JP1' &&
        requestRegion !== 'KR' &&
        requestRegion !== 'LA1' &&
        requestRegion !== 'LA2' &&
        requestRegion !== 'NA1' &&
        requestRegion !== 'OC1' &&
        requestRegion !== 'TR1' &&
        requestRegion !== 'RU'
    ) {
        return false;
    }
    return true;
}

// Ignore below => Attempting to send region from session storage instead of setting global var
router.put('/', asyncHandler(async (req, res, next) => {
    try {
        const { region } = req.body;

        if (!regionCheck(region)) {
            const err = Error("Invalid region.");
            err.errors = [`Region ${region} is not a valid region.`];
            err.status = 400;
            err.title = "Bad request.";
            throw err;
        }

        req.app.region = region
        res.json(`Region has been set to ${req.app.region}`)
    } catch (e) {
        next(e);
    }
}))

router.get('/region', asyncHandler(async (req, res, next) => {
    console.log(req.app.region);
    res.json(`The current region is ${req.app.region}`);
}))


module.exports = router;