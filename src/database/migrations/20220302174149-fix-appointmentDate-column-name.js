'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Appointments", "appoinmentDate", "appointmentDate");
  },

  async down (queryInterface, Sequelize) {
  }
};
