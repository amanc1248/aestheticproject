const express = require("express");
const app = express();
const path = require("path");
const { db } = require("../../database/db.js");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { redirect } = require("express/lib/response");

const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.originalUrl}`);
  res.status(404);
  next(error);
};
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// ensure admin authentication
const ensureAdminAuthentication = (req, res, next) => {
  console.log("Inside ensureAdminAuthentication");
  console.log(req.session);
  let sql = "select previous_loggedIn from admin where id=1;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      if (result[0].previous_loggedIn === "true") {
        if (req.session.adminAuthenticated) {
          return next();
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
// ensure employee authentication
const ensureEmployeeAuthentication = (req, res, next) => {
  console.log("Inside ensureEmployeeAuthentication");
  console.log(req.session);
  if (req.session.employeeAuthenticated) {
    return next();
    // res.redirect("http://localhost:3000/auth/false/notLoggedIn");
  } else {
    res.send("unAuthorized");
    console.log("You're not authorized as an Employee");
  }
};

// host, email, password testing
const smtpVerify = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, host, emailPassword } = req.body;
  console.log("CREDENTIALS");
  let transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: email, // generated ethereal user
      pass: emailPassword, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      res.send("invalid");
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
      next();
    }
  });
});
module.exports = {
  notFound,
  errorHandler,
  ensureAdminAuthentication,
  ensureEmployeeAuthentication,
  smtpVerify,
};
