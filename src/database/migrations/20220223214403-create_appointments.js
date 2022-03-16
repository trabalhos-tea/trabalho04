'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Appointments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      physicianId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model:'Physicians',Key:'id'},
        onUpdate:"RESTRICT",
        onDelete:"RESTRICT",
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model:'Patients', Key: 'id'},
        onUpdate:"RESTRICT",
        onDelete:"RESTRICT",
      },
      appoinmentDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Appointments");
  }
};
