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
    res.status(401).send({ message: "failure" });
    console.log("failure");
  }
});

const adminAddEmployeeController = asyncHandler(async (req, res) => {
  console.log("I ran");
  const { name, email, username, password, designation } = req.body;
  let sql =
    "select @employeeNum:=count(*)+1 from employee;INSERT INTO employee values (@employeeNum,?,?,?,?,?)";

  db.query(
    sql,
    [name, email, username, password, designation],
    (err, result) => {
      if (err) throw err;
      else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

const adminFetchEmployeeController = asyncHandler(async (req, res) => {
  console.log("adminFetchEmployeeController ran");
  let sql = "select * from employee";

  db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
      console.log(result);
    }
  });
});

const adminEditEmployeeController = asyncHandler(async (req, res) => {
  const { id, name, email, username, designation } = req.body;
  let sql = `UPDATE EMPLOYEE
  SET name=?,
      email=?,
      username=?,
      designation=?
  WHERE id=?
  `;

  db.query(sql, [name, email, username, designation, id], (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
      console.log(result);
    }
  });
});
const adminChangeEmployeePasswordController = asyncHandler(async (req, res) => {
  const { employeeId, oldPassword, newPassword } = req.body;
  console.log(req.body);
  let sqlSelect = `SELECT password from employee WHERE id=?`;
  let updateSql = `UPDATE employee set password=? where id=?;`;
  db.query(sqlSelect, [employeeId], (err, result) => {
    if (err) throw err;
    else {
      if (result.length === 0) {
        console.log(11111);
        res.status(401).send({ message: "Old Password did not match" });
      } else {
        if (result[0].password === oldPassword) {
          console.log(22222);
          db.query(updateSql, [newPassword, employeeId], (err, result) => {
            if (err) throw err;
            else {
              res.send("success");
              console.log("successfully changed the password");
            }
          });
        } else {
          console.log(33333);
          res.status(401).send({ message: "Old Password did not match" });
          console.log("old password did not match");
        }
      }
    }
  });
});

module.exports = {
  adminLoginController,
  adminAddEmployeeController,
  adminFetchEmployeeController,
  adminEditEmployeeController,
  adminChangeEmployeePasswordController,
};
