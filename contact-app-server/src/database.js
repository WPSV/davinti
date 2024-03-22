const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "davinti",
  password: "WPsv@3105",
  port: 5432,
});

module.exports = pool;