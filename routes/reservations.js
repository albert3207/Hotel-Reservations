
const router = require("express").Router()

const {createReservation, getallreservations} = require("../controllers/reservations")


router.route("/").post(createReservation).get(getallreservations)

module.exports = router