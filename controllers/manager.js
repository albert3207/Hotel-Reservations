const Admin = require("../models/admin/admin.model");
const User = require("../models/users/users.model")
const Reservation = require("../models/reservations/reservations.model")
const bcrypt = require("bcrypt")

const getllusersdetails = async (req, res) => {

    try {
        const users = await User.find({})
        const reservations = await Reservation.find({});
        return res.json({ allusers: [users, users.length], allreservations: [reservations, reservations.length]});
    } catch (error) {
        return res.json({msg: error})
    }
};

const createmanager = async (req, res) => {
  const { username, password } = req.body;
try {
  const isadmininDB = await Admin.findOne({ username });
  if (isadmininDB) return res.send("Admin already exist, try new usernamne"); // this line of code will do not allow to create user with similar username
  const hashedpassword = await bcrypt.hash(password, 10); // bcrypt to encrypt password before adding user to DB

  const createdmanager = await Admin.create({
    username,
    password: hashedpassword,
  });
  return res.json({ msg: createdmanager });
} catch (error) {
  console.log(error);
  return res.json({ msg: error });
}
};

const managerlogin = async (req, res) => {
    const {username, password} = req.body
    try {
      const ismanagerinDB = await Admin.findOne({ username });

      if (!ismanagerinDB) return res.send("no admin  found, create an account"); // to check if user in db or not

      const ispasswordcorrect = await bcrypt.compare(
        password,
        ismanagerinDB.password
      );

      if (ispasswordcorrect) {
        // const getuserreservationdetails = await Reservation.find({
        //   userid: isuserinDB._id,
        // });

        //if user has no reservation,  we will send empty array
        return res.json({
          msg: {
            login: "success",
            alluserdetails: "sending all user details",
          },
        });
      }

      return res.send("unauthorized, invalid password entry");
    } catch (error) {
      return res.send(error);
    }
};

module.exports = { getllusersdetails, createmanager, managerlogin };
