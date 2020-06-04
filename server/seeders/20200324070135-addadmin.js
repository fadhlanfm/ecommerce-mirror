'use strict';
const { hash } = require('../helpers/bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          name: 'Admin',
          email: 'admin@admin.com',
          password: hash('admin'),
          role: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};