var express = require("express");
var router = express.Router();
const {handleuserlogin, handlecreateuser} = require("../controllers/users");


router.route("/login").post(handleuserlogin);

router.route("/createuser").post(handlecreateuser)

module.exports = router;
