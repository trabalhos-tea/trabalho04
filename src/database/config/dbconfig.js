require("dotenv").config();

const { DB_SERVER, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
  dialect: "mysql",
  host: DB_SERVER,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  timezone: "-03:00",
  define: {
    timestamp: true,
  },
};
