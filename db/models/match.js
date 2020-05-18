'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    matchId: DataTypes.STRING,
    matchInfo: DataTypes.JSON
  }, {});
  Match.associate = function(models) {
    // associations can be defined here
  };
  return Match;
};