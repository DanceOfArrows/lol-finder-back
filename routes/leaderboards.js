const express = require('express');
const fetch = require("node-fetch");

const db = require('../db/models');
const { asyncHandler, handleRegionRequests, riotErrorHandling } = require('../utils');
const { riotKey } = require('../config');

const { Leaderboard } = db;
const router = express.Router();

// Display free champion rotation on home page
router.get('/:region', asyncHandler(async (req, res, next) => {
    try {

        let currentLeaderboard = await Leaderboard.findByPk(1);

        let dateCheck;
        if (currentLeaderboard) {
            dateCheck = Date.parse(new Date()) > (Date.parse(currentLeaderboard.updatedAt) + 600000);
        }

        if (!currentLeaderboard || dateCheck) {
            const regionUrl = handleRegionRequests(req.params.region);
            const getLeaderboardRes = await fetch(`${regionUrl}/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5`, {
                headers: { 'X-Riot-Token': riotKey }
            });

            if (getLeaderboardRes.ok) {
                const leaderboard = await getLeaderboardRes.json();
                const leaderboardList = leaderboard.entries;

                if (!currentLeaderboard) {
                    currentLeaderboard = Leaderboard.build({
                        leaderboard: leaderboardList,
                    })
                    await currentLeaderboard.save();
                } else {
                    currentLeaderboard.leaderboard = leaderboardList;
                    await currentLeaderboard.save();
                }

                const leaderboardRes = currentLeaderboard.leaderboard.map(summoner => {
                    const { leaguePoints, losses, summonerName, wins } = summoner;
                    return { leaguePoints, losses, summonerName, wins };
                })
                res.json(leaderboardRes);
            } else {
                throw (riotErrorHandling(leaderboardRes))
            }
        } else {
            const leaderboardRes = currentLeaderboard.leaderboard.map(summoner => {
                const { leaguePoints, losses, summonerName, wins } = summoner;
                return { leaguePoints, losses, summonerName, wins };
            })
            res.json(leaderboardRes);
        }

    } catch (e) {
        next(e);
    }

}))

module.exports = router;