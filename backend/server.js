const express = require("express");
const path = require("path");
// const { db } = require("../database/db.js");
// const { testDb } = require("./controllers/employee.js");
const app = express();
const PORT = process.env.PORT || 3001;
// app.get("/test", testDb);

app.get("/api", (req, res) => {
  res.send("Api is running");
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/api", (req, res) => {
    res.send("Api is running");
  });
}

app.listen(PORT, console.log("server is running"));
