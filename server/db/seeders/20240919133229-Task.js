'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          title: 'Finish project report',
          description: 'Need to finish the project report by end of the week.',
          isCompleted: false,
          userId: 1,
          categoryId: 1,
          priorityId: 3,
        },
        {
          title: 'Buy groceries',
          description: 'Buy milk, eggs, and bread.',
          isCompleted: false,
          userId: 2,
          categoryId: 3,
          priorityId: 1,
        },
        {
          title: 'Read a book',
          description: 'Finish reading "Clean Code".',
          isCompleted: true,
          userId: 3,
          categoryId: 2,
          priorityId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
