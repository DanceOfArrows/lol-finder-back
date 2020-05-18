'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlayerInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      summonerName: {
        type: Sequelize.STRING,
      },
      summonerIcon: {
        type: Sequelize.INTEGER,
      },
      summonerLevel: {
        type: Sequelize.INTEGER,
      },
      summonerId: {
        type: Sequelize.STRING
      },
      accountId: {
        type: Sequelize.STRING
      },
      matchHistory: {
        type: Sequelize.JSON
      },
      rank: {
        type: Sequelize.JSON
      },
      mastery: {
        type: Sequelize.JSON
      },
      masteryScore: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PlayerInfos');
  }
};