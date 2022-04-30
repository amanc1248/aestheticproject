const express = require("express");
const path = require("path");
const { db } = require("../database/db.js");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const { notFound, errorHandler } = require("./middleware/middleWare.js");
const { ensureAdminAuthentication } = require("./middleware/middleWare.js");
const session = require("express-session");
const store = new session.MemoryStore();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

// session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 20000,
      secure: false,
    },
  })
);

app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

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
