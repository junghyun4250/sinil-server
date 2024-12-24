const mysql = require("mysql2/promise");
const { dbConfig } = require("../DBsetup");

// API -
// case -
const reservationQuery = async (param) => {
  var insertQuery = `INSERT into sin_reserved_room (
    res_person, res_contact, res_date, pasture, res_time, room_name, update_time)
    VALUES(?,?,?,?,?,?,now())`;
  var connection = await mysql.createConnection(dbConfig);
  const result = await connection.query(insertQuery, param);
  connection.end();
  return result;
};
const getReservationCnt = async () => {
  var insertQuery = `select count(*) from sin_reserved_room`;
  var connection = await mysql.createConnection(dbConfig);
  const result = await connection.query(insertQuery);
  connection.end();
  return result;
};

module.exports = { reservationQuery, getReservationCnt };
