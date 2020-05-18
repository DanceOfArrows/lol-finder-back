const express = require('express');
const fetch = require("node-fetch");

const {
    asyncHandler,
    convertChampionId,
    convertQueueId,
    convertSeasonId,
    getSummonerInfo,
    handleRegionRequests,
    regionCheck,
    riotErrorHandling,
} = require('../utils');
const { riotKey } = require('../config');

const router = express.Router();

// Gets all relative info of summoner
router.get('/:region/:summonerName', asyncHandler(async (req, res, next) => {
    try {
        const checkRegion = regionCheck(req.params.region);
        if (checkRegion.errors) throw checkRegion;

        const summoner = await getSummonerInfo(req.params.summonerName, req.params.region);

        let dateCheck;
        if (summoner) {
            dateCheck = Date.parse(new Date()) > (Date.parse(summoner.updatedAt) + 600000);
        }

        if (!summoner || dateCheck) {
            const regionUrl = handleRegionRequests(req.params.region);
            const {
                summonerName,
                summonerIcon,
                summonerLevel,
                summonerId,
                accountId,
                matchHistory,
                rank,
                mastery,
                masteryScore,
            } = summoner;

            // Get player account info => Returns JSON
            const playerInfoRes = await fetch(`${regionUrl}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
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
                    })
                    await player.save();
                } else {
                    summoner.summonerId = id;
                    summoner.accountId = accountId;
                    summoner.summonerName = name;
                    summoner.summonerIcon = profileIconId;
                    summoner.summonerLevel = summonerLevel;
                    await summoner.save();
                }
            } else {
                const err = Error("Summoner not found.");
                err.errors = [`An error occurred when trying to fetch summoner data.`];
                err.status = 404;
                err.title = "Not Found.";
                return err;
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
                const { tier, rank, leaguePoints, wins, losses } = playerRank[0];
                const rankObj = { tier, rank, leaguePoints, wins, losses };

                // Returns the object inside of an array
                if (!summoner.rank || summoner.rank !== rank) {
                    summoner.rank = rankObj;
                    await summoner.save();
                }
            } else {
                throw (riotErrorHandling(leagueRes));
            }

            // Get Player Match History => Returns JSON
            // Request should look like `http://localhost:8080/match-history/Kindred+ADC?champion=203&queue=450&season=13`
            const championId = req.query.champion;
            const queueId = req.query.queue;
            const seasonId = req.query.season;
            const startIndex = req.query.startIndex;
            const endIndex = req.query.endIndex;

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

            const matchHistoryRes = await fetch(`${regionUrl}/lol/match/v4/matchlists/by-account/${accountId}${joinedUrlQueries}`, {
                headers: { 'X-Riot-Token': riotKey }
            });

            if (matchHistoryRes.ok) {
                const matchHistory = await matchHistoryRes.json();

                // Removal of unneccessary / private data and conversion of numbers to readable data
                const matchesPromise = matchHistory.matches.map(async match => {
                    const matchId = match.gameId;
                    const champion = await convertChampionId(match.champion);
                    const [map, queueDescription] = await convertQueueId(match.queue);
                    const season = await convertSeasonId(match.season);
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

            res.json({
                summonerName,
                summonerIcon,
                summonerLevel,
                matchHistory,
                rank,
                mastery,
                masteryScore,
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
            } = summoner;

            res.json({
                summonerName,
                summonerIcon,
                summonerLevel,
                matchHistory,
                rank,
                mastery,
                masteryScore,
            })
        }
    } catch (e) {
        next(e);
    }
}));

module.exports = router;