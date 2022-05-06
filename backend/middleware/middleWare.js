const express = require("express");
const app = express();
const path = require("path");
const { db } = require("../../database/db.js");
const asyncHandler = require("express-async-handler");

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
  } else {
    res.send("unAuthorized");
    console.log("You're not authorized as an Employee");
  }
};

module.exports = {
  notFound,
  errorHandler,
  ensureAdminAuthentication,
  ensureEmployeeAuthentication,
};
