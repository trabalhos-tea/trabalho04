'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Patients",
      [
        {
          name: "Jose Santos",
          email: "jose@gmail.com",
          phone: "41998126048",
        },
        {
          name: "Henrique Freitas",
          email: "henrique@gmail.com",
          phone: "41998127048",
        },
        {
          name: "Thiago Almeida",
          email: "thiago@gmail.com",
          phone: "41998126090",
        },
        {
          name: "Matheus Rico",
          email: "matheus@gmail.com",
          phone: "41998126100",
        },
        {
          name: "Lais Lara",
          email: "lais@gmail.com",
          phone: "41998126201",
        },
        {
          name: "Jessica Dias",
          email: "jessica@gmail.com",
          phone: "41997126078",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Patients", null, {});
  }
};
