const express = require('express');
const fetch = require("node-fetch");

const { asyncHandler, getSummonerInfo, handleRegionRequests, riotErrorHandling } = require('../utils');
const { riotKey } = require('../config');

const router = express.Router();

// Gets rank, wins, and losses of the current season
router.get('/:summonerName', asyncHandler(async (req, res, next) => {
    try {
        const summonerInfoRes = await getSummonerInfo(req.params.summonerName, req.session.region);
        if (summonerInfoRes.errors) {
            throw summonerInfoRes;
        }
        const { id } = summonerInfoRes;

        const regionUrl = handleRegionRequests(req.session.region, req.session.region);
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