const express = require("express");
// const { db } = require("../database/db.js");
// const { testDb } = require("./controllers/employee.js");
const app = express();
const PORT = process.env.PORT || 3001;
// app.get("/test", testDb);
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, console.log("server is running"));
