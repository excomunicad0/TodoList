'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Alex',
          email: 'Alex@mail.ru',
          password: '123',
        },
        {
          name: 'Alexa',
          email: 'Alexa@mail.ru',
          password: '321',
        },
        {
          name: 'Anon',
          email: 'Anon@mail.ru',
          password: '222',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
