const express = require("express");
// const { db } = require("../database/db.js");
// const { testDb } = require("./controllers/employee.js");
const app = express();
const PORT = process.env.PORT || 3001;
// app.get("/test", testDb);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../public_html")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../public_html", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

app.listen(PORT, console.log("server is running"));
