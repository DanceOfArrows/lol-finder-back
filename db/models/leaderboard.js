'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leaderboard = sequelize.define('Leaderboard', {
    leaderboard: DataTypes.JSON
  }, {});
  Leaderboard.associate = function(models) {
    // associations can be defined here
  };
  return Leaderboard;
};