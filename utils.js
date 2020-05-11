const fetch = require("node-fetch");
const { Op } = require("sequelize");

const db = require("./db/models");
const platformUrls = require('./routes/url-names');
const { riotKey } = require('./config');

const urls = platformUrls.urls;
const { BR1, EUN1, EUW1, JP1, KR, LA1, LA2, NA1, OC1, TR1, RU } = urls;


const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

const { Champion } = db;

const convertChampionId = async (championId) => {
    const champion = await Champion.findOne({
        where: {
            championId: championId,
        }
    })

    return champion.championName;
}

const convertFreeRotation = async (champRotationObj) => {
    const oldPlayerRotation = champRotationObj.freeChampionIds;
    const newPlayerRotation = champRotationObj.freeChampionIdsForNewPlayers;

    const oldPlayerPromises = oldPlayerRotation.map(championId => {
        return convertChampionId(championId)
    })

    const newPlayerPromises = newPlayerRotation.map(async championId => {
        return convertChampionId(championId)
    })

    const oldPlayerRotationConverted = await Promise.all(oldPlayerPromises);
    const newPlayerRotationConverted = await Promise.all(newPlayerPromises);

    return ({ freeChampionRotation: oldPlayerRotationConverted, freeChampionRotationForNewPlayers: newPlayerRotationConverted })
}

const getSummonerInfo = async (summonerName) => {
    const regionUrl = handleRegionRequests(globalRegion);
    const res = await fetch(`${regionUrl}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: { 'X-Riot-Token': riotKey }
    });

    if (res.ok) {
        const accountInfo = await res.json();
        return accountInfo;
    } else {
        const err = Error("Summoner not found.");
        err.errors = [`An error occurred when trying to fetch summoner data.`];
        err.status = 404;
        err.title = "Not Found.";
        return err;
    }
}

const getChampionId = async (championName) => {
    const champNameDecoded = championName.split('+').join(' ');

    const champion = await Champion.findOne({
        where: {
            championName: {
                [Op.iLike]: champNameDecoded
            },
        }
    })

    if (champion) {
        return champion.championId;
    } else {
        const err = Error("Champion not found.");
        err.errors = [`Failed to find ${champNameDecoded} in the database.`];
        err.status = 404;
        err.title = "Not Found.";
        return err;
    }
}

const handleRegionRequests = () => {
    if (globalRegion === 'BR1') return BR1;
    if (globalRegion === 'EUN1') return EUN1;
    if (globalRegion === 'EUW1') return EUW1;
    if (globalRegion === 'JP1') return JP1;
    if (globalRegion === 'KR') return KR;
    if (globalRegion === 'LA1') return LA1;
    if (globalRegion === 'LA2') return LA2;
    if (globalRegion === 'NA1') return NA1;
    if (globalRegion === 'OC1') return OC1;
    if (globalRegion === 'TR1') return TR1;
    if (globalRegion === 'RU') return RU;
}

const riotErrorHandling = (errRes) => {
    const err = Error(`${errRes.statusText}`);
    err.errors = [`An error was received while requesting data from Riot`];
    err.status = errRes.status;
    err.title = errRes.statusText
    return err;
}

module.exports = { asyncHandler, convertChampionId, convertFreeRotation, getChampionId, getSummonerInfo, handleRegionRequests, riotErrorHandling }