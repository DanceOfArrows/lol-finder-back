const express = require('express');
const fetch = require("node-fetch");

const db = require('../db/models');
const {
    asyncHandler,
    convertChampionId,
    convertQueueId,
    convertSeasonTimestamp,
    getSummonerInfo,
    handleRegionRequests,
    regionCheck,
    riotErrorHandling,
} = require('../utils');

const { PlayerInfo } = db;
const { riotKey } = require('../config');

const router = express.Router();

// Gets all relative info of summoner
router.get('/:region/:summonerName', asyncHandler(async (req, res, next) => {
    try {
        const checkRegion = regionCheck(req.params.region);
        if (checkRegion.errors) throw checkRegion;

        let summoner = await getSummonerInfo(req.params.summonerName, req.params.region);

        let dateCheck;
        if (summoner) {
            dateCheck = Date.parse(new Date()) > (Date.parse(summoner.updatedAt) + 600000);
        }

        if (!summoner || dateCheck) {
            const regionUrl = handleRegionRequests(req.params.region);

            // Get player account info => Returns JSON
            const playerInfoRes = await fetch(`${regionUrl}/lol/summoner/v4/summoners/by-name/${encodeURI(req.params.summonerName)}`, {
                headers: { 'X-Riot-Token': riotKey }
            });

            if (playerInfoRes.ok) {
                const accountInfo = await playerInfoRes.json();
                const { id, accountId, name, profileIconId, summonerLevel } = accountInfo;

                if (!summoner) {
                    summoner = PlayerInfo.build({
                        summonerName: name,
                        summonerId: id,
                        accountId: accountId,
                        summonerIcon: profileIconId,
                        summonerLevel: summonerLevel,
                        region: req.params.region,
                    })
                    await summoner.save();
                } else {
                    summoner.summonerId = id;
                    summoner.accountId = accountId;
                    summoner.summonerName = name;
                    summoner.summonerIcon = profileIconId;
                    summoner.summonerLevel = summonerLevel;
                    summoner.region = req.params.region;
                    await summoner.save();
                }
            } else {
                const err = Error("Summoner not found.");
                err.errors = [`An error occurred when trying to fetch summoner data.`];
                err.status = 404;
                err.title = "Not Found.";
                return err;
            }

            const {
                accountId,
                summonerId,
            } = summoner;

            // Get Player Match History => Returns JSON
            const matchHistoryRes = await fetch(`${regionUrl}/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&beginIndex=0`, {
                headers: { 'X-Riot-Token': riotKey }
            });

            if (matchHistoryRes.ok) {
                const matchHistory = await matchHistoryRes.json();

                // Removal of unneccessary / private data and conversion of numbers to readable data
                const matchesPromise = matchHistory.matches.map(async match => {
                    const matchId = match.gameId;
                    const champion = await convertChampionId(match.champion);
                    const [map, queueDescription] = await convertQueueId(match.queue);
                    const season = await convertSeasonTimestamp(match.timestamp, req.params.region);
                    return { matchId, champion, map, queueDescription, season };
                });

                const matches = await Promise.all(matchesPromise);

                if (summoner.matchHistory !== matches) {
                    summoner.matchHistory = matches;
                    await summoner.save();
                }

            } else {
                throw (riotErrorHandling(matchHistoryRes));
            }

            // Get Player Mastery Score => Returns integer
            const masteryScoreRes = await fetch(`${regionUrl}/lol/champion-mastery/v4/scores/by-summoner/${summonerId}`, {
                headers: { 'X-Riot-Token': riotKey }
            });

            if (masteryScoreRes.ok) {
                const masteryScore = await masteryScoreRes.json();

                if (!summoner.masteryScore || summoner.masteryScore !== masteryScore) {
                    summoner.masteryScore = masteryScore;
                    await summoner.save();
                }
            } else {
                throw (riotErrorHandling(masteryScoreRes));
            }

            // Get Player Mastery List => Returns JSON
            const masteriesRes = await fetch(`${regionUrl}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`, {
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

                if (!summoner.mastery || summoner.mastery !== masteriesConverted) {
                    summoner.mastery = masteriesConverted;
                    await summoner.save();
                }
            } else {
                throw (riotErrorHandling(masteriesRes));
            }

            // Get Player Rank => Returns an arr with obj inside of it
            const leagueRes = await fetch(`${regionUrl}/lol/league/v4/entries/by-summoner/${summonerId}`, {
                headers: { 'X-Riot-Token': riotKey }
            });

            if (leagueRes.ok) {
                const playerRank = await leagueRes.json();
                let soloRank;

                playerRank.forEach(type => {
                    if (type.queueType === 'RANKED_SOLO_5x5') soloRank = type;
                })

                const { tier, rank, leaguePoints, wins, losses } = soloRank;
                const rankObj = { tier, rank, leaguePoints, wins, losses };

                // Returns the object inside of an array
                if (!summoner.rank || summoner.rank !== rank) {
                    summoner.rank = rankObj;
                    await summoner.save();
                }
            } else {
                throw (riotErrorHandling(leagueRes));
            }

            const {
                summonerName,
                summonerIcon,
                summonerLevel,
                matchHistory,
                rank,
                mastery,
                masteryScore,
                region,
            } = summoner;

            res.json({
                summonerName,
                summonerIcon,
                summonerLevel,
                matchHistory,
                rank,
                mastery,
                masteryScore,
                region,
            })
        } else {
            const {
                summonerName,
                summonerIcon,
                summonerLevel,
                matchHistory,
                rank,
                mastery,
                masteryScore,
                region,
            } = summoner;

            res.json({
                summonerName,
                summonerIcon,
                summonerLevel,
                matchHistory,
                rank,
                mastery,
                masteryScore,
                region,
            })
        }
    } catch (e) {
        next(e);
    }
}));

module.exports = router;