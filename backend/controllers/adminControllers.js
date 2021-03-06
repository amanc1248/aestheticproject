const { db } = require("../../database/db.js");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const uniqid = require("uniqid");
const crypto = require("crypto");
dotenv.config();
const secret = process.env.CRYPTO_SECRET;

// encrypt
const encrypt = (password) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);

  const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    password: encryptedPassword.toString("hex"),
  };
};

// decrypt

const decrypt = (password, iv) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secret),
    Buffer.from(iv, "hex")
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(password, "hex")),
    decipher.final(),
  ]);

  console.log(decryptedPassword.toString());
  return decryptedPassword.toString();
};

// admin login
const adminLoginController = asyncHandler(async (req, res) => {
  const { pass } = req.body;
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
  }
});

const checkAdminLoginStatus = (req, res) => {
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
  const {
    name,
    email,
    host,
    emailPassword,
    password: userPassword,
    designation,
  } = req.body;
  const { password, iv } = encrypt(userPassword);
  console.log("**********************");
  console.log(password);
  console.log(iv);
  const employeeId = uniqid();
  let sql =
    "INSERT INTO employee values (?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP())";

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
      iv,
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

const adminFetchAllEmployeeController = asyncHandler(async (req, res) => {
  console.log("adminFetchEmployeeController ran");
  let sql =
    "select id, name, designation from employee order by date_time DESC";

  db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      if (result.length === 0) {
        res.send("no employees");
      } else {
        res.send(result);
        console.log("all emplyees");
        console.log(result);
      }
    }
  });
});

//fetch employee by Id
const adminEmployeeByIdController = asyncHandler(async (req, res) => {
  console.log("adminEmployeeByIdController rannn...");
  const username = req.params.id;
  let sql =
    "SELECT id, name, host, email, email_password,username, designation from employee where username=?;";
  db.query(sql, [username], (err, result) => {
    if (err) throw err;
    else {
      if (result.length === 0) {
        res.send("no employee");
      } else {
        console.log("Employee By Id controller: ");
        console.log(result);
        res.send(result[0]);
      }
    }
  });
});
//fetch employee by Id all details
const adminEmployeeByIdAllDetailsController = asyncHandler(async (req, res) => {
  console.log("adminEmployeeByIdController rannn...");
  const username = req.params.id;
  let sql = "SELECT * from employee where username=?;";
  db.query(sql, [username], (err, result) => {
    if (err) throw err;
    else {
      if (result.length === 0) {
        res.send("no employee");
      } else {
        console.log("Employee By Id controller: ");
        console.log(result);

        res.json({
          username: result[0].username,
          email: result[0].email,
          password: decrypt(result[0].password, result[0].iv),
          email_password: result[0].email_password,
        });
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
      }
    }
  );
});

const adminChangeEmployeePasswordController = asyncHandler(async (req, res) => {
  const { employeeId, oldPassword, newPassword } = req.body;
  console.log(req.body);
  let sqlSelect = `SELECT password,iv from employee WHERE id=?`;
  let updateSql = `UPDATE employee set password=?, iv=? where id=?;`;
  db.query(sqlSelect, [employeeId], (err, result) => {
    if (err) throw err;
    else {
      if (result.length === 0) {
        console.log(11111);
        res.status(401).send({ message: "Old Password did not match" });
      } else {
        if (decrypt(result[0].password, result[0].iv) === oldPassword) {
          const { password, iv } = encrypt(newPassword);
          db.query(updateSql, [password, iv, employeeId], (err, result) => {
            if (err) throw err;
            else {
              res.send("success");
              console.log("successfully changed the password");
            }
          });
        } else {
          res.status(401).send({ message: "Old Password did not match" });
          console.log("old password did not match");
        }
      }
    }
  });
});

const adminDeleteEmployeeController = asyncHandler(async (req, res) => {
  const employeeId = req.params.employeeId;
  let deleteSql = `DELETE FROM employee WHERE id=?;`;
  db.query(deleteSql, [employeeId], (err, result) => {
    if (err) throw err;
    else {
      if (result.affectedRows === 0) {
        res.status(401).send({ message: "No employee with that id" });
      } else {
        res.send("success");
        console.log("deleted success");
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
  adminFetchAllEmployeeController,
  adminEditEmployeeController,
  adminChangeEmployeePasswordController,
  adminDeleteEmployeeController,
  adminLogoutController,
  checkAdminLoginStatus,
  adminEmployeeByIdController,
  adminEmployeeByIdAllDetailsController,
};
