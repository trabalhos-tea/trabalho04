const Sequelize = require("sequelize");
const dbCongif = require("./config/dbconfig");

const Patients = require("../models/Patients");
const Physicians = require("../models/Physicians");
const Appointments = require("../models/Appointments");

const connection = new Sequelize(dbCongif);

Patients.init(connection);
Physicians.init(connection);
Appointments.init(connection);

Patients.associate(connection.models);
Physicians.associate(connection.models);
Appointments.associate(connection.models);

module.exports = connection;