const { Op } = require("sequelize");

const db = require("./db/models");
const platformUrls = require('./routes/url-names');


// Import urls from url file
const urls = platformUrls.urls;
const { BR1, EUN1, EUW1, JP1, KR, LA1, LA2, NA1, OC1, TR1, RU } = urls;

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

//Destructure models because I like it
const { Champion, PlayerInfo, QueueType, Season } = db;

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

//Converts timestamp into the name of the seasons
const convertSeasonTimestamp = async (timestamp, region) => {
    let adjustedTime;

    if (region === 'BR1') adjustedTime = timestamp - 3600;
    if (region === 'EUN1') adjustedTime = timestamp - 21600;
    if (region === 'EUW1') adjustedTime = timestamp - 10800;
    if (region === 'JP1') adjustedTime = timestamp - 43200;
    if (region === 'KR') adjustedTime = timestamp - 39600;
    if (region === 'LA1') adjustedTime = timestamp + 7200;
    if (region === 'LA2') adjustedTime = timestamp;
    if (region === 'NA1') adjustedTime = timestamp + 10800;
    if (region === 'OC1') adjustedTime = timestamp - 46800;
    if (region === 'TR1') adjustedTime = timestamp - 18000;
    if (region === 'RU') adjustedTime = timestamp - 28800;

    if (adjustedTime >= 1359691200 && adjustedTime < 1389772800) return 'Season 3';
    if (adjustedTime >= 1389772800 && adjustedTime < 1421308800) return 'Season 4';
    if (adjustedTime >= 1421308800 && adjustedTime < 1452758400) return 'Season 5';
    if (adjustedTime >= 1452758400 && adjustedTime < 1484121600) return 'Season 6';
    if (adjustedTime >= 1484121600 && adjustedTime < 1515571200) return 'Season 7';
    if (adjustedTime >= 1515571200 && adjustedTime < 1547020800) return 'Season 8';
    if (adjustedTime >= 1547020800 && adjustedTime < 1578477600) return 'Season 9';
    if (adjustedTime >= 1578477600 && adjustedTime < Date.parse((new Date()))) return 'Season 10';

    const err = Error("Invalid Timestamp.");
    err.errors = [`Failed to convert timestamp to season.`];
    err.status = 400;
    err.title = "Not Found.";
    return err;
};

// Check if summoner is in database
const getSummonerInfo = async (summonerName, region) => {
    const name = decodeURIComponent(summonerName);
    let player = await PlayerInfo.findOne({
        where: {
            summonerName: {
                [Op.iLike]: name,
            },
            region: region,
        }
    });
    if (player) {
        return player;
    } else {
        return '';
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

// Check region
const regionCheck = (requestRegion) => {
    // if requestRegion is not equal to any regions, return error 
    if (requestRegion !== 'BR1' &&
        requestRegion !== 'EUN1' &&
        requestRegion !== 'EUW1' &&
        requestRegion !== 'JP1' &&
        requestRegion !== 'KR' &&
        requestRegion !== 'LA1' &&
        requestRegion !== 'LA2' &&
        requestRegion !== 'NA1' &&
        requestRegion !== 'OC1' &&
        requestRegion !== 'TR1' &&
        requestRegion !== 'RU'
    ) {
        const err = Error("Invalid Region.");
        err.errors = [`${requestRegion} is not a valid region`];
        err.status = 400;
        err.title = "Bad request.";
        return err;
    }
    return requestRegion;
}

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
    convertSeasonTimestamp,
    getChampionId,
    getSummonerInfo,
    handleRegionRequests,
    regionCheck,
    riotErrorHandling
};