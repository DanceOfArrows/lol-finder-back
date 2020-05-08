const express = require('express');
const fetch = require("node-fetch");

const { asyncHandler } = require('../utils');
const {convertChampionNames, handleRegionRequests} = require('../utils-riot');
const { riotKey } = require('../config');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const regionUrl = handleRegionRequests(globalRegion);
    const getRotationRes = await fetch(`${regionUrl}/lol/platform/v3/champion-rotations/`, {
        headers: { 'X-Riot-Token': riotKey }
    });

    if (getRotationRes.ok) {
        const rotations = await getRotationRes.json();
        const freeRotation = await convertChampionNames(rotations);

        res.json(freeRotation);
    }
}))

module.exports = router;