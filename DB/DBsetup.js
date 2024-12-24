require("dotenv").config();

// DB connection
const dbConfig = {
  host: process.env.DB_IP,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

module.exports = { dbConfig };
