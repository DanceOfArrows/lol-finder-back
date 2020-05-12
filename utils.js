const fetch = require("node-fetch");
const { Op } = require("sequelize");

const db = require("./db/models");
const platformUrls = require('./routes/url-names');
const { riotKey } = require('./config');

// Import urls from url file
const urls = platformUrls.urls;
const { BR1, EUN1, EUW1, JP1, KR, LA1, LA2, NA1, OC1, TR1, RU } = urls;

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

//Destructure models because I like it
const { Champion, QueueType, Season } = db;

//Turns a champion's id into their name
const convertChampionId = async (championId) => {
    const champion = await Champion.findOne({
        where: {
            championId: championId,
        }
    })

    return champion.championName;
}

//Convert the free week rotation ids to champion names
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

    return ({ freeChampionRotation: oldPlayerRotationConverted, freeChampionRotationForNewPlayers: newPlayerRotationConverted });
};

//Converts the queue id to the map name and queue type name
const convertQueueId = async (queueId) => {
    const queue = await QueueType.findOne({
        where: {
            queueId: queueId,
        }
    });

    return [queue.map, queue.description];
};

//Converts season id into the name of the seasons (shortened to `S${seasonNumber}`)
const convertSeasonId = async (seasonId) => {
    const season = await Season.findByPk(seasonId);

    return season.seasonName;
};

//Gets the summoner info from riot in order to use encrypted id, accountId, etc.
const getSummonerInfo = async (summonerName, region) => {
    const regionUrl = handleRegionRequests(region);
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
    };
};

//Changes the champion name to its id (readability in URL => removable, but will need changes)
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
    };
}

//Returns the URL of the region depending on the global region variable.
const handleRegionRequests = (region) => {
    if (region === 'BR1') return BR1;
    if (region === 'EUN1') return EUN1;
    if (region === 'EUW1') return EUW1;
    if (region === 'JP1') return JP1;
    if (region === 'KR') return KR;
    if (region === 'LA1') return LA1;
    if (region === 'LA2') return LA2;
    if (region === 'NA1') return NA1;
    if (region === 'OC1') return OC1;
    if (region === 'TR1') return TR1;
    if (region === 'RU') return RU;
};

//Error handler for all thing Riot
const riotErrorHandling = (errRes) => {
    const err = Error(`${errRes.statusText}`);
    err.errors = [`An error was received while requesting data from Riot`];
    err.status = errRes.status;
    err.title = errRes.statusText
    return err;
};

module.exports = {
    asyncHandler,
    convertChampionId,
    convertFreeRotation,
    convertQueueId,
    convertSeasonId,
    getChampionId,
    getSummonerInfo,
    handleRegionRequests,
    riotErrorHandling
};