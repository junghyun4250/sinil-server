const {
  reservationQuery,
  getReservationCnt,
  getmonthData,
  cancelReservation,
  adminLogin,
} = require("../../DB/Queries/reservationQueries");

const reservationAPI = async (req, res) => {
  const {
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
  } = req.body;

  var param = [
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
  ];
  try {
    await reservationQuery(param);
    const [count] = await getReservationCnt(param);
    let total_cnt = count[0]["count(*)"];
    res.json({ total_cnt: total_cnt });
  } catch (err) {
    console.error("Error fetching data: ", err);
    res.status(500).json({ error: "Error fetching data" });
  }
};
const reservationCntAPI = async (req, res) => {
  try {
    const [count] = await getReservationCnt();
    let total_cnt = count[0]["count(*)"];
    res.json({ total_cnt: total_cnt });
  } catch (err) {
    console.error("Error fetching data: ", err);
    res.status(500).json({ error: "Error fetching data" });
  }
};
const monthDataAPI = async (req, res) => {
  try {
    const { currentYear, currentMonth, roomCode } = req.body;
    const formattedMonth = currentMonth.padStart(2, "0"); // '03'
    var param = [roomCode, `${currentYear}-${formattedMonth}%`];
    const [data] = await getmonthData(param);
    console.log("data: ", data);
    res.json({ monthData: data });
  } catch (err) {
    console.error("Error fetching data: ", err);
    res.status(500).json({ error: "Error fetching data" });
  }
};
const cancelReservationAPI = async (req, res) => {
  try {
    const { contactNum, name, res_id, id, idx } = req.body;
    var param = { contactNum, name, res_id, id, idx };
    const [result] = await cancelReservation(param);
    let response = "done";
    if (result.affectedRows === 0) {
      response = "none";
    }
    res.json({ result: response });
  } catch (err) {
    console.error("Error fetching data: ", err);
    res.status(500).json({ error: "Error fetching data" });
  }
};
const adminLoginAPI = async (req, res) => {
  try {
    const { adminId, adminPassword } = req.body;
    var param = [adminId, adminPassword];
    const [result] = await adminLogin(param);
    res.json({ idx: result[0].idx, id: result[0].id });
  } catch (err) {
    console.error("Error fetching data: ", err);
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  reservationAPI,
  reservationCntAPI,
  monthDataAPI,
  cancelReservationAPI,
  adminLoginAPI,
};
