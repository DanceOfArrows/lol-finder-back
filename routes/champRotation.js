const express = require('express');
const fetch = require("node-fetch");

const { asyncHandler, handleRegionRequest } = require('../utils');
const { riotKey } = require('../config');

const router = express.Router();

region1 = "NA1";
region2 = "NA1";

router.get('/', asyncHandler(async (req, res) => {
    const regionUrl = handleRegionRequest(req.region);
    const getRotationReq = await fetch(`${regionUrl}/lol/platform/v3/champion-rotations/`, {
        headers: { 'X-Riot-Token': riotKey }
    });

    if (res.ok) {
        const championRotation = await getRotationReq.json();
        console.log(championRotation)
    }


}))

router.post('/', asyncHandler(async (req, res) => {
    console.log(req.body)
    const { region } = req.body;
    const userRegion = handleRegionRequest(region);

    region2 = userRegion;
    res.json({ region2 })
}))

module.exports = router;