'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerInfo = sequelize.define('PlayerInfo', {
    summonerName: DataTypes.STRING,
    summonerIcon: DataTypes.INTEGER,
    summonerLevel: DataTypes.INTEGER,
    summonerId: DataTypes.STRING,
    accountId: DataTypes.STRING,
    matchHistory: DataTypes.JSON,
    rank: DataTypes.JSON,
    mastery: DataTypes.JSON,
    masteryScore: DataTypes.INTEGER,
  }, {});
  PlayerInfo.associate = function (models) {
    // associations can be defined here
  };
  return PlayerInfo;
};