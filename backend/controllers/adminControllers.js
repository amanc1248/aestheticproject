const { db } = require("../../database/db.js");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

// admin login
const adminLoginController = asyncHandler(async (req, res) => {
  console.log("I ran");
  const { pass } = req.body;
  console.log("pass:>>", pass, "<<");
  console.log("From env:>>", process.env.ADMIN_PASS, "<<");

  if (process.env.ADMIN_PASS === pass) {
    res.send("success");
    console.log("success");
  } else {
    res.send("failure");
    console.log("failure");
  }
  // let sql = "select * from admin where id=1;";
  // db.query(sql, (err, result) => {
  //   if (err) throw err;
  //   else {
  //     if (result.password === pass) {
  //       res.send("success");
  //       console.log("success");
  //     } else {
  //       res.send("failure");
  //       console.log("failure");
  //     }
  //   }
  // });
});

module.exports = { adminLoginController };
