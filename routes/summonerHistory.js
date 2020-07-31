const express = require('express');
const fetch = require("node-fetch");

const db = require('../db/models');
const { asyncHandler,
    convertChampionId,
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

        let dateCheck;
        if (match) {
            dateCheck = Date.parse(new Date()) > (Date.parse(match.updatedAt) + 600000);
        }

        const regionUrl = handleRegionRequests(req.params.region);

        if (!match || dateCheck) {
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
                const summonerGameInfo = await Promise.all(participants.map(async participant => {
                    const { championId, ...otherData } = participant;
                    const championName = await convertChampionId(championId);

                    return { championName, ...otherData };
                }));
                const returnMatch = { gameDuration, teams, participants: summonerGameInfo, participantIdentities: summonerInfo };

                if (!match) {
                    match = Match.build({
                        matchId: matchId,
                        matchInfo: returnMatch,
                    })
                    await match.save();
                } else {
                    match.matchInfo = returnMatch;
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