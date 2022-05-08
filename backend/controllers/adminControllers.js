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
  let sql = `
  update admin
  set previous_loggedIn='true'
  where id =1;
  `;
  if (process.env.ADMIN_PASS === pass) {
    req.session.adminAuthenticated = true;
    db.query(sql, (err, result) => {
      if (err) throw err;
      else {
        if (result) {
          res.send("success");
        }
      }
    });
  } else {
    res.status(401).send({ message: "Login Failed" });
    console.log("failure");
  }
});

const checkAdminLoginStatus = (req, res) => {
  console.log(req.session);
  let sql = "select previous_loggedIn from admin where id=1;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      if (result[0].previous_loggedIn === "true") {
        if (req.session.adminAuthenticated) {
          res.send("success");
        } else {
          console.log("expired");
          res.send("expired");
        }
      } else {
        console.log("notLoggedIn");
        res.send("notLoggedIn");
      }
    }
  });
};
const adminAddEmployeeController = asyncHandler(async (req, res) => {
  console.log("I ran");
  console.log(req.body);
  const { name, email, host, emailPassword, password, designation } = req.body;
  const employeeId = uniqid();
  let sql = "INSERT INTO employee values (?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP())";

  db.query(
    sql,
    [
      employeeId,
      name,
      host,
      email,
      emailPassword,
      designation,
      employeeId,
      password,
    ],
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

//fetch employee by Id
const adminEmployeeByIdController = asyncHandler(async (req, res) => {
  const username = req.params.id;
  console.log("here is the usernaem: ", username);
  let sql = "SELECT * from employee where username=?;";
  db.query(sql, [username], (err, result) => {
    if (err) throw err;
    else {
      console.log(result);
      if (result.length === 0) {
        res.send("no employee");
      } else {
        res.send(result[0]);
      }
    }
  });
});

const adminEditEmployeeController = asyncHandler(async (req, res) => {
  const { id, name, host, email, emailPassword, designation } = req.body;
  let sql = `UPDATE EMPLOYEE
  SET name=?,
      host=?,
      email=?,
      email_password=?,
      designation=?
  WHERE id=?
  `;

  db.query(
    sql,
    [name, host, email, emailPassword, designation, id],
    (err, result) => {
      if (err) throw err;
      else {
        res.send("success");
        console.log(result);
      }
    }
  );
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
  req.session.destroy();
  if (req.session) {
    res.send("failure");
  } else {
    res.send("destroyed");
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
  checkAdminLoginStatus,
  adminEmployeeByIdController,
};
