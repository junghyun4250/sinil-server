require("dotenv").config();

const DBInfo = {
  host: process.env.DB_IP,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

const IP = process.env.SERVER_IP;
const HTTP_PORT = process.env.SERVER_HTTPPORT; //4004;
const HTTPS_PORT = process.env.SERVER_HTTPSPORT; //4005;
const FRONT_PORT = process.env.FRONT_PORT;

const HTTP_URL = `http://${IP}:${HTTP_PORT}`;
const HTTPS_URL = `https://${IP}:${HTTPS_PORT}`;
const HTTP_FRONTURL = `http://${IP}:${FRONT_PORT}`;
const HTTPS_FRONTURL = `https://${IP}:${FRONT_PORT}`;

module.exports = {
  DBInfo,
  IP,
  HTTP_PORT,
  HTTPS_PORT,
  FRONT_PORT,
  HTTP_URL,
  HTTPS_URL,
  HTTP_FRONTURL,
  HTTPS_FRONTURL,
};
