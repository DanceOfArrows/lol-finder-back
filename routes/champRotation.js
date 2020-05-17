const express = require('express');
const fetch = require("node-fetch");

const { asyncHandler, convertFreeRotation, handleRegionRequests, regionCheck, riotErrorHandling } = require('../utils');
const { riotKey } = require('../config');

const router = express.Router();

// Display free champion rotation on home page
router.get('/:region', asyncHandler(async (req, res, next) => {
    try {
        const checkRegion = regionCheck(req.params.region);
        if (checkRegion.errors) throw checkRegion;

        const regionUrl = handleRegionRequests(req.params.region); // change URL based on given region
        const getRotationRes = await fetch(`${regionUrl}/lol/platform/v3/champion-rotations/`, {
            headers: { 'X-Riot-Token': riotKey }
        });

        if (getRotationRes.ok) {
            const rotations = await getRotationRes.json();
            const freeRotation = await convertFreeRotation(rotations); // convert champion IDs to champion names

            res.json(freeRotation);
        } else {
            throw (riotErrorHandling(getRotationRes))
        }
    } catch (e) {
        next(e);
    }

}))

module.exports = router;