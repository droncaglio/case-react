'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Classes', [
      { name: 'Turma 1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Turma 2', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Turma 3', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Turma 4', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Turma 5', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Classes', null, {});
  }
};
