const express = require('express');
const fetch = require("node-fetch");

const { asyncHandler, handleRegionRequests, riotErrorHandling } = require('../utils');
const { riotKey } = require('../config');

const router = express.Router();

// Display free champion rotation on home page
router.get('/:region', asyncHandler(async (req, res, next) => {
    try {
        const regionUrl = handleRegionRequests(req.params.region);
        const getLeaderboardRes = await fetch(`${regionUrl}/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5`, {
            headers: { 'X-Riot-Token': riotKey }
        });

        if (getLeaderboardRes.ok) {
            const leaderboard = await getLeaderboardRes.json();
            const leaderboardList = leaderboard.entries;

            const leaderboardRes = leaderboardList.map(summoner => {
                const { leaguePoints, losses, summonerName, wins } = summoner;
                return { leaguePoints, losses, summonerName, wins };
            })
            res.json(leaderboardRes);
        } else {
            throw (riotErrorHandling(getRotationRes))
        }
    } catch (e) {
        next(e);
    }

}))

module.exports = router;