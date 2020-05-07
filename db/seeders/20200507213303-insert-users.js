'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('UserInfos', [
      { email: 'demo@demo.user', username: 'Demo', hashedPassword: createPassword(), createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserInfos', null, {});
  }
};
