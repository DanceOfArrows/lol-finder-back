const platformUrls = require('./routes/url-names');

const urls = platformUrls.urls;
const { BR1, EUN1, EUW1, JP1, KR, LA1, LA2, NA1, OC1, TR1, RU } = urls;
const db = require("./db/models");

const { Champion } = db;

const convertChampionNames = async (champRotationObj) => {
    const oldPlayerRotation = champRotationObj.freeChampionIds;
    const newPlayerRotation = champRotationObj.freeChampionIdsForNewPlayers;

    const oldPlayerPromises = oldPlayerRotation.map(async championId => {
        const champion = await Champion.findOne({
            where: {
                championId: championId,
            }
        })
        
        return champion.championName;
    })

    const newPlayerPromises = newPlayerRotation.map(async championId => {
        const champion = await Champion.findOne({
            where: {
                championId: championId,
            }
        })
        
        return champion.championName;
    })

    const oldPlayerRotationConverted = await Promise.all(oldPlayerPromises);
    const newPlayerRotationConverted = await Promise.all(newPlayerPromises);

    return({ freeChampionRotation: oldPlayerRotationConverted, freeChampionRotationForNewPlayers: newPlayerRotationConverted })
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

module.exports = { convertChampionNames, handleRegionRequests }