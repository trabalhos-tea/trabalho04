"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Physicians",
      [
        {
          name: "Marcos Lorem",
          email: "marcos@lorem.com",
          password: "marcoslorem123",
        },
        {
          name: "João Ipsum",
          email: "joao@ipsum.com",
          password: "joaoipsum456",
        },
        {
          name: "Pedro Dolor",
          email: "pedro@dolor.com",
          password: "pedrodolor789",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Physicians", null, {});
  },
};
