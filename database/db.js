const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();
// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   multipleStatements: true,
// });
const db = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b0d62e1c262749",
  password: "fe61b116",
  database: "heroku_e9cbc65fb336414",
  multipleStatements: true,
});

// Connect
module.exports = { db };
