'use strict';
module.exports = (sequelize, DataTypes) => {
  const QueueType = sequelize.define('QueueType', {
    queueId: DataTypes.INTEGER,
    map: DataTypes.STRING,
    description: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {});
  QueueType.associate = function(models) {
    // associations can be defined here
  };
  return QueueType;
};