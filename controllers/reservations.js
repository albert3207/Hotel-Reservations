const Reservation = require("../models/reservations/reservations.model");

const createReservation = async (req, res) => {
  const { roomid, startdate, enddate, numberofpeople } = req.body; //TODO (will change the username from req.body to req.headers and will grab the username from sent accesstoken)
  const authheader = req.headers["authorization"];

  const userid = authheader.split(" ")[1]; //TODO will change the userid with token and get the user id from token
  try {
    const createdreservation = await Reservation.create({
      roomid,
      startdate,
      enddate,
      numberofpeople,
      userid,
    });
    //sending reservartion details back to client
    return res.json({ msg: createdreservation });
  } catch (error) {
    return res.json({ msg: error });
  }
};

const getallreservations = async (req, res) => {
  const authheader = req.headers["authorization"];
  const userid = authheader.split(" ")[1]; //TODO will change the userid with token and get the user id from token
   
  try {
// fetching all reservation from db and sending it to user
    const allreservations = await Reservation.find({userid})
    return res.json({allreservations, totalreservations: allreservations.length});
  }
  catch(error){
    console.log(error)
    return res.send({error})
  }
  
};

module.exports = { createReservation, getallreservations };
