const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservationSchema = new Schema({
  userid: { type: String, required: true },
  roomid: { type: Number, reqiuired: true },
  startdate: {type: String, required: true},
  enddate: {type: String, required: true},               //TODO change the startdate and enddate type to Date
  createdAt: { type: String, default: Date.now() },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;
