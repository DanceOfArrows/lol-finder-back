const express = require('express');
const fetch = require("node-fetch");

const { asyncHandler, getSummonerInfo, handleRegionRequests, regionCheck, riotErrorHandling } = require('../utils');
const { riotKey } = require('../config');

const router = express.Router();

// Gets rank, wins, and losses of the current season
router.get('/:region/:summonerName', asyncHandler(async (req, res, next) => {
    try {
        const checkRegion = regionCheck(req.params.region);
        if (checkRegion.errors) throw checkRegion;

        const summonerInfoRes = await getSummonerInfo(req.params.summonerName, req.params.region);
        if (summonerInfoRes.errors) {
            throw summonerInfoRes;
        }
        const { id } = summonerInfoRes;

        const regionUrl = handleRegionRequests(req.params.region, req.params.region);
        const leagueRes = await fetch(`${regionUrl}/lol/league/v4/entries/by-summoner/${id}`, {
            headers: { 'X-Riot-Token': riotKey }
        });

        if (leagueRes.ok) {
            const playerRank = await leagueRes.json();
            const { tier, rank, leaguePoints, wins, losses } = playerRank[0]; // Returns the object inside of an array
            res.json({ tier, rank, leaguePoints, wins, losses });
        } else {
            throw (riotErrorHandling(leagueRes));
        }
    } catch (e) {
        next(e);
    }
}));

module.exports = router;