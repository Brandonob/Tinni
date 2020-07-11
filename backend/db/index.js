//This is index
// require("dotenv").config()

const pgp = require("pg-promise")({});
const db = pgp("postgress://localhost:5432/codename_ida");
module.exports = db;
