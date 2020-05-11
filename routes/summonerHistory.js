const express = require('express');
const fetch = require("node-fetch");

const { asyncHandler,
    convertChampionId,
    convertQueueId,
    convertSeasonId,
    getSummonerInfo,
    handleRegionRequests,
    riotErrorHandling
} = require('../utils');
const { riotKey } = require('../config');

const router = express.Router();

//Get all matches by user
router.get('/:summonerName', asyncHandler(async (req, res, next) => {
    try {
        //Request should look like `http://localhost:8080/match-history/Kindred+ADC?champion=203&queue=450&season=13`
        const championId = req.query.champion;
        const queueId = req.query.queue;
        const seasonId = req.query.season;
        const startIndex = req.query.startIndex;
        const endIndex = req.query.endIndex;

        const summonerInfoRes = await getSummonerInfo(req.params.summonerName);
        if (summonerInfoRes.errors) {
            throw summonerInfoRes;
        }
        const { accountId } = summonerInfoRes;

        const joinQueries = () => {
            let urlQueries = [];

            if (championId) urlQueries.push(`champion=${championId}`);
            if (queueId) urlQueries.push(`queue=${queueId}`);
            if (seasonId) urlQueries.push(`season=${seasonId}`);
            if (startIndex) urlQueries.push(`startIndex=${startIndex}`);
            if (endIndex) urlQueries.push(`endIndex=${endIndex}`);

            return urlQueries.join('&');
        }

        const joinedUrlQueries = championId || queueId || seasonId || startIndex || endIndex ? '?' + joinQueries() : ''

        const regionUrl = handleRegionRequests(globalRegion);
        const matchHistoryRes = await fetch(`${regionUrl}/lol/match/v4/matchlists/by-account/${accountId}${joinedUrlQueries}`, {
            headers: { 'X-Riot-Token': riotKey }
        });

        if (matchHistoryRes.ok) {
            const matchHistory = await matchHistoryRes.json();

            //Removal of unneccessary / private data and conversion of numbers to readable data
            const matchesPromise = matchHistory.matches.map(async match => {
                const matchId = match.gameId;
                const champion = await convertChampionId(match.champion);
                const [map, queueDescription] = await convertQueueId(match.queue);
                const season = await convertSeasonId(match.season);
                return { matchId, champion, map, queueDescription, season };
            });

            const matches = await Promise.all(matchesPromise);
            res.json(matches)
        } else {
            throw (riotErrorHandling(matchHistoryRes));
        }
    } catch (e) {
        next(e);
    }
}));

//Get details of a single match
router.get('/:summonerName/:matchId', asyncHandler(async (req, res, next) => {
    try {
        const matchId = req.params.matchId;
        const regionUrl = handleRegionRequests(globalRegion);
        const matchInfoRes = await fetch(`${regionUrl}/lol/match/v4/matches/${matchId}`, {
            headers: { 'X-Riot-Token': riotKey }
        });

        if (matchInfoRes.ok) {
            const match = await matchInfoRes.json();
            //Removal of unneccessary / private data
            const { gameDuration, teams, participants, participantIdentities } = match;
            const playerInfo = participantIdentities.map(participant => {
                const player = participant.player;
                const participantId = participant.participantId;
                const { summonerName, profileIcon } = player;

                return { participantId: participantId, player: { summonerName: summonerName, profileIcon: profileIcon } }
            })
            res.json({ gameDuration, teams, participants, participantIdentities: playerInfo });
        } else {
            throw (matchInfoRes);
        }
    } catch (e) {
        next(e);
    };
}));

module.exports = router;