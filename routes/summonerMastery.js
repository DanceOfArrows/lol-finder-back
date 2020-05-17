const express = require('express');
const fetch = require("node-fetch");

const { asyncHandler, convertChampionId, getChampionId, getSummonerInfo, handleRegionRequests, regionCheck, riotErrorHandling } = require('../utils');
const { riotKey } = require('../config');

const router = express.Router();

// All champion mastery
router.get('/:region/:summonerName', asyncHandler(async (req, res, next) => {
    try {
        const checkRegion = regionCheck(req.params.region);
        if (checkRegion.errors) throw checkRegion;

        const summonerInfoRes = await getSummonerInfo(req.params.summonerName, req.params.region);
        if (summonerInfoRes.errors) {
            throw summonerInfoRes;
        }
        const { id } = summonerInfoRes;

        const regionUrl = handleRegionRequests(req.params.region);
        const masteriesRes = await fetch(`${regionUrl}/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`, {
            headers: { 'X-Riot-Token': riotKey }
        });

        if (masteriesRes.ok) {
            const masteryScores = await masteriesRes.json();
            const masteriesConvertedPromise = masteryScores.map(async score => {
                const champName = await convertChampionId(score.championId);
                const champScore = score.championPoints;
                const champLevel = score.championLevel;

                return { champName, champScore, champLevel }
            })

            const masteriesConverted = await Promise.all(masteriesConvertedPromise);

            res.json(masteriesConverted)
        } else {
            throw (riotErrorHandling(masteriesRes));
        }
    } catch (e) {
        next(e);
    }
}));

// Total mastery score
router.get('/:region/:summonerName/score', asyncHandler(async (req, res, next) => {
    try {
        const summonerInfoRes = await getSummonerInfo(req.params.summonerName, req.params.region);
        if (summonerInfoRes.errors) {
            throw summonerInfoRes;
        }
        const { id } = summonerInfoRes;

        const regionUrl = handleRegionRequests(req.params.region);
        const masteryScoreRes = await fetch(`${regionUrl}/lol/champion-mastery/v4/scores/by-summoner/${id}`, {
            headers: { 'X-Riot-Token': riotKey }
        });

        if (masteryScoreRes.ok) {
            const masteryScore = await masteryScoreRes.json();
            res.json({ masteryScore })
        } else {
            throw (riotErrorHandling(masteryScoreRes));
        }
    } catch (e) {
        next(e)
    }

}));

// Specific champion mastery
router.get('/:region/:summonerName/:championName', asyncHandler(async (req, res, next) => {
    try {
        const summonerInfoRes = await getSummonerInfo(req.params.summonerName, req.params.region);
        if (summonerInfoRes.errors) {
            throw summonerInfoRes;
        }
        const { id } = summonerInfoRes;

        const championId = await getChampionId(req.params.championName);
        if (championId.errors) {
            throw championId;
        }

        const regionUrl = handleRegionRequests(req.params.region);
        const masteryRes = await fetch(`${regionUrl}/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}/by-champion/${championId}`, {
            headers: { 'X-Riot-Token': riotKey }
        });

        if (masteryRes.ok) {
            const masteryScore = await masteryRes.json();

            const champName = await convertChampionId(masteryScore.championId);
            const champScore = masteryScore.championPoints;
            const champLevel = masteryScore.championLevel;

            res.json({ champName, champScore, champLevel })
        } else {
            throw (riotErrorHandling(masteryRes));
        }
    } catch (e) {
        next(e)
    }
}));

module.exports = router;