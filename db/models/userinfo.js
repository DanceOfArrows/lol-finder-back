'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInfo = sequelize.define('UserInfo', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  UserInfo.associate = function(models) {
    // associations can be defined here
  };
  return UserInfo;
};