const express = require('express');

const { asyncHandler } = require('../utils');

const router = express.Router();

// Global region variable to be used in every route
globalRegion = "NA1";

const regionCheck = (requestRegion) => {
    // if requestedRegion is not equal to any regions, return false 
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

const regionNotFoundErr = (requestRegion) => {
    const err = Error("Invalid region.");
    err.errors = [`Region ${requestRegion} is not a valid region.`];
    err.status = 400;
    err.title = "Bad request.";
    return err;
}

router.put('/', asyncHandler(async (req, res, next) => {
    const { region } = req.body;

    
    if(regionCheck(region)) {
        // Set globalRegion to request region otherwise
        globalRegion = region;
    
        res.json();
    } else { // If the region is not equal to any of the ones listed above => return error.
        next(regionNotFoundErr(region))
    }
}))

module.exports = router;