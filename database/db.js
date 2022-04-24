const express = require("express");
const mysql = require("mysql");
const db = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b0d62e1c262749",
  password: "fe61b116",
  database: "heroku_e9cbc65fb336414",
  multipleStatements: true,
});
// Connect
module.exports = { db };
