'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChampRotation = sequelize.define('ChampRotation', {
    rotations: DataTypes.JSON
  }, {});
  ChampRotation.associate = function(models) {
    // associations can be defined here
  };
  return ChampRotation;
};