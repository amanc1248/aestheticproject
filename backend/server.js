const express = require("express");
// const { db } = require("../database/db.js");
// const { testDb } = require("./controllers/employee.js");
const app = express();
// app.get("/test", testDb);
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(3001, console.log("server is running"));
