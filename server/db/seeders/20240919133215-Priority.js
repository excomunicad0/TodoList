'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Priorities',
      [
        {
          level: 'High',
        },
        {
          level: 'Medium',
        },
        {
          level: 'Low',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Priorities', null, {});
  },
};
