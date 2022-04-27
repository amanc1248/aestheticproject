const express = require("express");
const {
  employeeLoginController,
} = require("../controllers/employeeControllers");

const router = express.Router();
router.route("/employeeLogin").post(employeeLoginController);

module.exports = router;
