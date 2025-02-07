const fs = require("fs");
const express = require("express");
const session = require("express-session");
const http = require("http");
const https = require("https");
const multer = require("multer");
const cors = require("cors"); // cors 미들웨어 추가
const morgan = require("morgan");
const moment = require("moment-timezone");
const dotenv = require("dotenv");
const {
  reservationAPI,
  reservationCntAPI,
  monthDataAPI,
  cancelReservationAPI,
  adminLoginAPI,
} = require("./nodejs/API/reservationAPI.js");
const {
  DBInfo,
  IP,
  HTTP_PORT,
  HTTPS_PORT,
  FRONT_PORT,
  HTTP_URL,
  HTTPS_URL,
  HTTP_FRONTURL,
  HTTPS_FRONTURL,
} = require("./nodejs/lib/conststr.js");

const app = express();

// 'combined' 로그 형식을 사용한 morgan 미들웨어 추가
app.use(morgan("combined"));

app.use((req, res, next) => {
  const contentLength = req.headers["content-length"];
  if (contentLength) {
    const contentLengthMB = (contentLength / (1024 * 1024)).toFixed(2);
    console.log(`Request Content-Length: ${contentLengthMB} MB`);
  }
  console.log(`Request Content-Length: ${contentLength} bytes`);

  next();
});

app.use(cors()); // cors 미들웨어 사용
app.use(express.json());

// 예약하기기
app.post("/reserveRoom", (req, res) => {
  reservationAPI(req, res);
});
app.post("/reserveRoomCnt", (req, res) => {
  reservationCntAPI(req, res);
});
app.post("/monthData", (req, res) => {
  monthDataAPI(req, res);
});
app.post("/cancelReservation", (req, res) => {
  cancelReservationAPI(req, res);
});
app.post("/adminLogin", (req, res) => {
  adminLoginAPI(req, res);
});

http.createServer(app).listen(HTTP_PORT, IP, () => {
  console.log(`서버가 ${HTTP_URL} 에서 실행 중입니다.`);
});
https.createServer(app).listen(HTTPS_PORT, IP);
