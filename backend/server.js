const express = require("express");
const path = require("path");
const { db } = require("../database/db.js");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const { notFound, errorHandler } = require("./middleware/middleWare.js");
const { ensureAdminAuthentication } = require("./middleware/middleWare.js");
const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const app = express();
dotenv.config();
const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

var connection = mysql.createPool(options);
const sessionStore = new MySQLStore({}, connection);

const PORT = process.env.PORT || 3001;
app.use(express.json());

// session
const adminSession = session({
  secret: process.env.ADMIN_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  name: "adminSession",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
  },
});

// const employeeSession
const employeeSession = session({
  secret: process.env.EMPLOYEE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  name: "employeeSession",

  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
  },
});

app.use("/api/admin", adminSession, adminRoutes);
app.use("/api/employee", employeeSession, employeeRoutes);

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
