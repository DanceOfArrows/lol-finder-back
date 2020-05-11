'use strict';
module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('Season', {
    seasonName: DataTypes.STRING
  }, {});
  Season.associate = function (models) {
    // associations can be defined here
  };
  return Season;
};