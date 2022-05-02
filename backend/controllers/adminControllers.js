const { db } = require("../../database/db.js");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const uniqid = require("uniqid");
// const session = require("express-session");
dotenv.config();

// admin login
const adminLoginController = asyncHandler(async (req, res) => {
  console.log("I ran");
  const { pass } = req.body;
  console.log("pass:>>", pass, "<<");
  console.log("From env:>>", process.env.ADMIN_PASS, "<<");

  if (process.env.ADMIN_PASS === pass) {
    req.session.adminAuthenticated = true;
    req.session.admin = { pass: pass };
    console.log(req.session);
    res.send("success");
  } else {
    res.status(401).send({ message: "Login Failed" });
    console.log("failure");
  }
});

const adminAddEmployeeController = asyncHandler(async (req, res) => {
  console.log("I ran");
  const { name, email, password, designation } = req.body;
  const employeeId = uniqid();
  let sql = "INSERT INTO employee values (?,?,?,?,?,?,CURRENT_TIMESTAMP())";

  db.query(
    sql,
    [employeeId, name, email, employeeId, password, designation],
    (err, result) => {
      if (err) throw err;
      else {
        res.send("success");
        console.log(result);
      }
    }
  );
});

const adminFetchEmployeeController = asyncHandler(async (req, res) => {
  console.log("adminFetchEmployeeController ran");
  let sql = "select * from employee order by date_time DESC";

  db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      if (result.length === 0) {
        res.send("no employees");
      } else {
        res.send(result);
      }
    }
  });
});

const adminEditEmployeeController = asyncHandler(async (req, res) => {
  const { id, name, email, designation } = req.body;
  let sql = `UPDATE EMPLOYEE
  SET name=?,
      email=?,
      designation=?
  WHERE id=?
  `;

  db.query(sql, [name, email, designation, id], (err, result) => {
    if (err) throw err;
    else {
      res.send("success");
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

const adminDeleteEmployeeController = asyncHandler(async (req, res) => {
  const employeeId = req.params.employeeId;
  console.log(req.body);
  let deleteSql = `DELETE FROM employee WHERE id=?;`;
  db.query(deleteSql, [employeeId], (err, result) => {
    if (err) throw err;
    else {
      if (result.affectedRows === 0) {
        res.status(401).send({ message: "No employee with that id" });
      } else {
        res.send("success");
        console.log("deleted success");
        console.log(result);
      }
    }
  });
});

const adminLogoutController = asyncHandler(async (req, res) => {
  if (req.session.adminAuthenticated) {
    req.session.destroy();
    if (req.session) {
      res.send("failure");
    } else {
      res.send("destroyed");
    }
  }
});

module.exports = {
  adminLoginController,
  adminAddEmployeeController,
  adminFetchEmployeeController,
  adminEditEmployeeController,
  adminChangeEmployeePasswordController,
  adminDeleteEmployeeController,
  adminLogoutController,
};
