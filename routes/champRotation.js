const express = require('express');
const fetch = require("node-fetch");

const db = require('../db/models');
const { asyncHandler, convertFreeRotation, handleRegionRequests, regionCheck, riotErrorHandling } = require('../utils');
const { riotKey } = require('../config');

const { ChampRotation } = db;
const router = express.Router();

// Display free champion rotation on home page
router.get('/:region', asyncHandler(async (req, res, next) => {
    try {
        let currentRotation = await ChampRotation.findByPk(1);
        let dateCheck;

        if (currentRotation) {
            dateCheck = Date.parse(new Date()) > (Date.parse(currentRotation.updatedAt) + 3600000);
        }

        const checkRegion = regionCheck(req.params.region);
        if (checkRegion.errors) throw checkRegion;
        const regionUrl = handleRegionRequests(req.params.region); // change URL based on given region


        if (!currentRotation || dateCheck) {
            const getRotationRes = await fetch(`${regionUrl}/lol/platform/v3/champion-rotations/`, {
                headers: { 'X-Riot-Token': riotKey }
            });

            if (getRotationRes.ok) {
                const rotations = await getRotationRes.json();
                const freeRotation = await convertFreeRotation(rotations); // convert champion IDs to champion names

                if (!currentRotation) {
                    currentRotation = ChampRotation.build({
                        rotations: freeRotation
                    });
                    await currentRotation.save();
                } else if (currentRotation.rotations !== freeRotation) {
                    currentRotation.rotations = freeRotation;
                    await currentRotation.save();
                }

                res.json(freeRotation);
            } else {
                throw (riotErrorHandling(getRotationRes))
            }
        } else {
            res.json(currentRotation.rotations);
        }

    } catch (e) {
        next(e);
    }

}))

module.exports = router;