'use strict';
module.exports = (sequelize, DataTypes) => {
  const Champion = sequelize.define('Champion', {
    championId: DataTypes.INTEGER,
    championName: DataTypes.STRING
  }, {});
  Champion.associate = function(models) {
    // associations can be defined here
  };
  return Champion;
};