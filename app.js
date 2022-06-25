var express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const reservationRoute = require("./routes/reservations")
const managerRoute = require("./routes/manager")

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/manager", managerRoute)
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/reservations", reservationRoute);


mongoose.connect(process.env.MONGODB_URI)
app.listen(3000, () => console.log("app is running on port 3000"));


module.exports = app;
