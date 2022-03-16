const express = require("express");
const app = express();
const router = require("./routes/router");
require("./database");
const port = process.env.SYSTEM_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => console.log(`Server running at localhost:${port}`));

module.exports = app;