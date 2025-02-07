const mysql = require("mysql2/promise");
const { dbConfig } = require("../DBsetup");

// API -
// case -
const reservationQuery = async (param) => {
  var insertQuery = `INSERT into sin_reserved_room (
    roomCode,
    date,
    contactNum,
    department,
    departmentDescription,
    endTime,
    mokjang,
    name,
    numCnt,
    startTime,
    reservedTime
  ) VALUES(?,?,?,?,?,?,?,?,?,?,now())`;
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
const getmonthData = async (param) => {
  var insertQuery = `
  SELECT * 
  FROM sin_reserved_room 
  WHERE roomCode = ? and cancel = 0 and date LIKE ?
`;
  var connection = await mysql.createConnection(dbConfig);
  const result = await connection.query(insertQuery, param);
  connection.end();
  return result;
};
const cancelReservation = async (param) => {
  var insertQuery = `
  UPDATE sin_reserved_room
  SET cancel = 1
  WHERE contactNum = ? AND name = ? AND res_id = ?;
  `;
  var connection = await mysql.createConnection(dbConfig);
  const result = await connection.query(
    insertQuery,
    param,
    (error, results) => {
      if (error) {
        console.error("쿼리 실행 중 오류 발생:", error);
        return res.status(500).send("failed");
      }

      if (results.affectedRows === 0) {
        // 업데이트된 행이 없을 경우
        return res.status(404).send("none");
      }

      // 성공 응답
      res.status(200).send("success");
    }
  );
  connection.end();
  return result;
};

const adminLogin = async (param) => {
  var insertQuery = `
  SELECT * 
  FROM admin 
  WHERE id = ? and password = ?;
`;
  var connection = await mysql.createConnection(dbConfig);
  const result = await connection.query(insertQuery, param);
  connection.end();
  return result;
};
module.exports = {
  reservationQuery,
  getReservationCnt,
  getmonthData,
  cancelReservation,
  adminLogin,
};
