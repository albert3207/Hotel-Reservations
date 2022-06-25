const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/users/users.model");
const Reservation = require("../models/reservations/reservations.model");

// this route controller will handle all the user login requests
const handleuserlogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const isuserinDB = await User.findOne({ username });

    if (!isuserinDB) return res.send("no user found, create an account"); // to check if user in db or not

    const ispasswordcorrect = await bcrypt.compare(
      password,
      isuserinDB.password
    );

    if (ispasswordcorrect) {
      const getuserreservationdetails = await Reservation.find({
        userid: isuserinDB._id,
      });

      //if user has no reservation,  we will send empty array
      return res.json({
        msg: {
          login: "success",
          pastreservationDetails: getuserreservationdetails,
        },
      });
    }

    return res.send("unauthorized, invalid password entry");
  } catch (error) {
    return res.send(error);
  }
};

// this controller will create a uesr and add it to the DB
const handlecreateuser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const isuserinDB = await User.findOne({ username });
    if (isuserinDB) return res.send("user already exist, try new usernamne"); // this line of code will do not allow to create user with similar username
    const hashedpassword = await bcrypt.hash(password, 10); // bcrypt to encrypt password before adding user to DB

    const createduser = await User.create({
      username,
      password: hashedpassword,
    });
    return res.json({ msg: createduser });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error });
  }
};

module.exports = { handleuserlogin, handlecreateuser };
