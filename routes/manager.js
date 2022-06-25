const router = require("express").Router()

const {createmanager, getllusersdetails, managerlogin} = require("../controllers/manager")

// FIXIT getllusersdetails will send all user details and their reservation details
router.route("/").get(getllusersdetails).post(managerlogin);

router.route("/create").post(createmanager)

module.exports = router