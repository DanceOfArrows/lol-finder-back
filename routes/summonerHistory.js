const express = require('express');
const fetch = require("node-fetch");

const db = require('../db/models');
const { asyncHandler,
    handleRegionRequests,
    regionCheck,
} = require('../utils');
const { riotKey } = require('../config');

const { Match } = db;
const router = express.Router();

// Get details of a single match
router.get('/:region/:matchId', asyncHandler(async (req, res, next) => {
    try {
        const matchId = req.params.matchId;
        const checkRegion = regionCheck(req.params.region);
        if (checkRegion.errors) throw checkRegion;

        let match = await Match.findOne({
            where: {
                matchId: matchId,
            }
        });

        const regionUrl = handleRegionRequests(req.params.region);

        if (!match) {
            const matchInfoRes = await fetch(`${regionUrl}/lol/match/v4/matches/${matchId}`, {
                headers: { 'X-Riot-Token': riotKey }
            });

            if (matchInfoRes.ok) {
                const matchRes = await matchInfoRes.json();
                // Removal of unneccessary / private data
                const { gameDuration, teams, participants, participantIdentities } = matchRes;
                const summonerInfo = participantIdentities.map(participant => {
                    const summoner = participant.player;
                    const participantId = participant.participantId;
                    const { summonerName, profileIcon } = summoner;

                    return { participantId: participantId, summoner: { summonerName: summonerName, profileIcon: profileIcon } }
                })
                const returnMatch = { gameDuration, teams, participants, participantIdentities: summonerInfo };

                if (!match) {
                    match = Match.build({
                        matchId: matchId,
                        matchInfo: returnMatch,
                    })
                    await match.save();
                }

                res.json(returnMatch);
            } else {
                throw (matchInfoRes);
            }
        } else {
            res.json(match.matchInfo);
        }
    } catch (e) {
        next(e);
    };
}));

module.exports = router;