'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Seasons', [
      { seasonName: "PS4", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "S4", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "PS5", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "S5", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "PS6", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "S6", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "PS7", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "S7", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "PS8", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "S8", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "PS9", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "S9", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "PS10", createdAt: new Date(), updatedAt: new Date() },
      { seasonName: "S10", createdAt: new Date(), updatedAt: new Date() }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Seasons', null, {});
  }
};
