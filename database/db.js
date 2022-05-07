const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
  connectionLimit: 1000,
});

// Connect
module.exports = { db };
