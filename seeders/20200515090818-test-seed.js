'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('test', [{
      phone: "00123",
      createdAt: new Date(),
      updatedAt: new Date()
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('test', null, {});
  }
};
