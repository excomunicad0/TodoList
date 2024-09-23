'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          title: 'Не опоздать в кампус',
          description: 'Точно не опоздать в кампус, быть к 9:00',
          isCompleted: false,
          userId: 1,
          categoryId: 1,
          priorityId: 3,
        },
        {
          title: 'Выпить кофе/чай перед лекцией',
          description: 'Взять кофе в самом лучшем автомате',
          isCompleted: false,
          userId: 1,
          categoryId: 1,
          priorityId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
