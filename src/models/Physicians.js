const Sequelize = require("sequelize");

class Physicians extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Appointments, { foreignKey: "physicianId" });
    }
}

module.exports = Physicians;