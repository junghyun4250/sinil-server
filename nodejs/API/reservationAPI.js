const {
  reservationQuery,
  getReservationCnt,
} = require("../../DB/Queries/reservationQueries");

const reservationAPI = async (req, res) => {
  const { resPerson, resContact, resDate, pasture, resTime, roomName } =
    req.body;
  console.log(
    `resPerson:${resPerson}, resContact:${resContact}, resDate:${resDate}, pasture:${pasture}, resTime:${resTime}, roomName:${roomName}`
  );

  var param = [resPerson, resContact, resDate, pasture, resTime, roomName];
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

module.exports = { reservationAPI, reservationCntAPI };
