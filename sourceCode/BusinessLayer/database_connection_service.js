const { Pool } = require("pg");

const pool = new Pool({
  user: "azamat",
  host: "localhost",
  database: "HPM_Database",
  password: "",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
