const { db } = require("../../database/db.js");
const asyncHandler = require("express-async-handler");

// employee LOGIN
const employeeLoginController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  let sqlIfExists = "Select password from employee where username=?";
  db.query(sqlIfExists, [username], (err, result) => {
    console.log("employeeLoginController ran....");
    if (err) throw err;
    else {
      if (result.length === 0) {
        console.log("invalid username");
        res.status(401).send({ message: "Invalid username" });
      } else if (result[0].password !== password) {
        res.status(401).send({ message: "Invalid Password" });
      } else {
        res.send("Success");
      }
    }
  });
});

//fetch users
const employeeFetchUsersController = asyncHandler(async (req, res) => {
  let sql = "SELECT * from users;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      if (result[0].length === 0) {
        res.send("no users");
      } else {
        res.send(result[0]);
      }
    }
  });
});

module.exports = { employeeLoginController, employeeFetchUsersController };
